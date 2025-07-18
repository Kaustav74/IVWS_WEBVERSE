# StarScope Astronomy Application

## Overview

StarScope is a modern full-stack web application for astronomy enthusiasts, offering guided telescope tours, astrophotography services, live streaming of celestial events, and educational webinars. The application features an interactive constellation map, membership plans, event tracking with countdown timers, and a comprehensive user experience with space-themed design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom space-themed color variables
- **Animations**: Framer Motion for smooth animations and interactions

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with `/api` prefix for all routes
- **Middleware**: Custom logging middleware for API request tracking
- **Error Handling**: Centralized error handling middleware

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless driver (ACTIVE)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **Tables**: users, bookings, events, favorites with full CRUD operations
- **Development Storage**: DatabaseStorage implementation with fallback support

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **User Schema**: Basic user model with username and password fields
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations

## Key Components

### Client-Side Components
1. **Navigation System**: Smooth scrolling navigation with mobile-responsive design
2. **Hero Section**: Animated starfield background with floating celestial elements
3. **Services Section**: Interactive service cards with pricing and features
4. **Constellation Map**: Interactive night sky visualization with clickable constellations
5. **Membership Plans**: Tiered subscription plans with feature comparison
6. **Events Section**: Upcoming astronomical events with real-time countdown timers
7. **Floating Action Button**: Help system with animated orbital elements

### Server-Side Architecture
1. **Route Registration**: Modular route system with HTTP server creation
2. **Storage Abstraction**: Interface-based storage system for scalability
3. **Development Tools**: Vite integration for hot module replacement
4. **Static File Serving**: Production-ready static file serving

### Shared Resources
1. **Database Schema**: Type-safe schema definitions with Zod validation
2. **Type Definitions**: Shared TypeScript types between client and server

## Data Flow

### Client-Server Communication
1. **API Requests**: TanStack React Query handles all server communication
2. **Error Handling**: Centralized error handling with toast notifications
3. **State Management**: Server state cached and synchronized via React Query
4. **Form Validation**: Zod schemas ensure data integrity

### Database Operations
1. **User Management**: CRUD operations through storage interface
2. **Session Persistence**: PostgreSQL-backed session storage
3. **Schema Evolution**: Version-controlled migrations via Drizzle Kit

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **@radix-ui/***: Accessible UI component primitives

### Development Tools
- **Vite**: Development server and build tool
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Production bundling for server code

### UI and Styling
- **Shadcn/ui**: Pre-built accessible components
- **Tailwind CSS**: Responsive design system
- **Custom CSS Variables**: Space-themed color palette
- **Lucide React**: Icon library

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds React application to `dist/public`
2. **Server Build**: ESBuild bundles Node.js server to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: Hot reload with Vite middleware integration
- **Production**: Static file serving with Express
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Deployment Requirements
1. **Node.js Environment**: ES modules support required
2. **PostgreSQL Database**: Neon or compatible PostgreSQL instance
3. **Environment Variables**: DATABASE_URL for database connection
4. **Build Artifacts**: Client assets and bundled server code

### Development Workflow
1. **Database Migrations**: `npm run db:push` for schema updates
2. **Development Server**: `npm run dev` for hot reload development
3. **Type Checking**: `npm run check` for TypeScript validation
4. **Production Build**: `npm run build` for deployment preparation

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout the stack, and a scalable foundation for future enhancements. The space-themed design and interactive features create an engaging user experience for astronomy enthusiasts.
