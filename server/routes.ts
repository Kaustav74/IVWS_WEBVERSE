import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertUserSchema, insertBookingSchema, insertEventSchema, insertFavoriteSchema } from "@shared/schema";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(id, updates);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  app.get("/api/users/:userId/bookings", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const bookings = await storage.getUserBookings(userId);
    res.json(bookings);
  });

  app.get("/api/bookings/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const booking = await storage.getBooking(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  });

  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertBookingSchema.partial().parse(req.body);
      const booking = await storage.updateBooking(id, updates);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid update data" });
    }
  });

  // Event routes
  app.get("/api/events", async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const events = await storage.getEvents(limit);
    res.json(events);
  });

  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid event data" });
    }
  });

  app.get("/api/events/type/:eventType", async (req, res) => {
    const eventType = req.params.eventType;
    const events = await storage.getEventsByType(eventType);
    res.json(events);
  });

  // Favorites routes
  app.get("/api/users/:userId/favorites", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const favorites = await storage.getUserFavorites(userId);
    res.json(favorites);
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const favoriteData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addFavorite(favoriteData);
      res.status(201).json(favorite);
    } catch (error) {
      res.status(400).json({ error: "Invalid favorite data" });
    }
  });

  app.delete("/api/users/:userId/favorites", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { itemType, itemId } = req.body;
    
    if (!itemType || !itemId) {
      return res.status(400).json({ error: "itemType and itemId are required" });
    }
    
    const removed = await storage.removeFavorite(userId, itemType, itemId);
    if (!removed) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    
    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
