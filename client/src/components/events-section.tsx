import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Bell, Loader2, Satellite } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getNearEarthObjects, getAstronomyPicture, type NearEarthObject, type AstronomyPictureData } from "@/lib/nasa-api";

// Static astronomical events as fallback
const fallbackEvents = [
  {
    title: "Lunar Eclipse",
    description: "Witness the Moon turn red as it passes through Earth's shadow",
    date: "Dec 15, 2024",
    time: "21:30 - 23:45",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    targetDate: new Date("2024-12-15T21:30:00"),
    action: "Set Reminder",
    type: "eclipse"
  },
  {
    title: "Geminids Meteor Shower",
    description: "Peak viewing of one of the year's most spectacular meteor showers",
    date: "Dec 13-14, 2024",
    time: "22:00 - 04:00",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    targetDate: new Date("2024-12-13T22:00:00"),
    action: "Join Live Stream",
    type: "meteor"
  },
  {
    title: "Saturn Opposition",
    description: "Perfect time to observe Saturn's rings in stunning detail",
    date: "Dec 20, 2024",
    time: "20:00 - 02:00",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    targetDate: new Date("2024-12-20T20:00:00"),
    action: "Book Tour",
    type: "planetary"
  }
];

interface CelestialEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  targetDate: Date;
  action: string;
  type: string;
  distance?: string;
  velocity?: string;
  isNasaData?: boolean;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft(`${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`);
      } else {
        setTimeLeft("Event Started!");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function EventsSection() {
  const [events, setEvents] = useState<CelestialEvent[]>(fallbackEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [astronomyPicture, setAstronomyPicture] = useState<AstronomyPictureData | null>(null);

  useEffect(() => {
    const fetchCelestialEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get dates for next 7 days
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        
        const startDate = today.toISOString().split('T')[0];
        const endDate = nextWeek.toISOString().split('T')[0];

        // Fetch Near Earth Objects and astronomy picture
        const [neoData, apod] = await Promise.all([
          getNearEarthObjects(startDate, endDate),
          getAstronomyPicture()
        ]);

        setAstronomyPicture(apod);

        // Convert NASA data to events format
        const nasaEvents: CelestialEvent[] = neoData
          .filter(neo => neo.close_approach_data?.length > 0)
          .slice(0, 3) // Limit to 3 events
          .map(neo => {
            const approach = neo.close_approach_data[0];
            const approachDate = new Date(approach.close_approach_date);
            const diameter = neo.estimated_diameter.kilometers;
            const avgDiameter = (diameter.estimated_diameter_min + diameter.estimated_diameter_max) / 2;
            
            return {
              title: `Asteroid ${neo.name}`,
              description: `A ${avgDiameter.toFixed(1)}km asteroid passing ${parseFloat(approach.miss_distance.kilometers).toLocaleString()} km from Earth`,
              date: approachDate.toLocaleDateString(),
              time: approachDate.toLocaleTimeString(),
              image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
              targetDate: approachDate,
              action: "Track Object",
              type: "asteroid",
              distance: `${parseFloat(approach.miss_distance.kilometers).toLocaleString()} km`,
              velocity: `${parseFloat(approach.relative_velocity.kilometers_per_hour).toLocaleString()} km/h`,
              isNasaData: true
            };
          });

        // Combine NASA events with fallback events
        const combinedEvents = [...nasaEvents, ...fallbackEvents].slice(0, 6);
        setEvents(combinedEvents);

      } catch (err) {
        console.error('Error fetching celestial events:', err);
        setError('Unable to fetch real-time NASA data. Showing scheduled astronomical events.');
        setEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchCelestialEvents();
  }, []);

  return (
    <section id="events" className="py-12 sm:py-20 px-4 relative bg-gradient-to-r from-cosmic-purple/10 to-space-blue/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 bg-gradient-to-r from-stellar-gold to-aurora-green bg-clip-text text-transparent">
            Upcoming Celestial Events
          </h2>
          <p className="text-lg sm:text-xl visible-text px-4 mb-6">
            Real-time NASA data and scheduled astronomical events
          </p>
          
          {astronomyPicture && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-space-blue/60 backdrop-blur-md rounded-lg p-4 max-w-2xl mx-auto mb-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <Satellite className="text-stellar-gold" size={20} />
                <span className="text-stellar-gold font-semibold">NASA Featured Content</span>
              </div>
              <p className="visible-text text-sm">{astronomyPicture.title}</p>
            </motion.div>
          )}

          {error && (
            <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3 max-w-2xl mx-auto mb-6">
              <p className="text-yellow-200 text-sm">{error}</p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-3 text-stellar-gold mb-6">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading NASA celestial events...</span>
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events && Array.isArray(events) && events.map((event, index) => (
            <EventCard key={`${event.title}-${index}`} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }: { event: CelestialEvent, index: number }) {
  const countdown = useCountdown(event.targetDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`bg-gradient-to-br from-cosmic-purple/40 to-space-blue/40 border ${event.isNasaData ? 'border-stellar-gold/60' : 'border-stellar-gold/20'} hover:border-stellar-gold/60 transition-all duration-300 backdrop-blur-sm overflow-hidden`}>
        <div className="relative">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-40 object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-blue/60 to-transparent"></div>
          {event.isNasaData && (
            <div className="absolute top-2 left-2 bg-stellar-gold text-space-blue px-2 py-1 rounded-full text-xs font-semibold">
              NASA LIVE
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <h3 className="font-semibold text-xl mb-2 text-stellar-gold">
            {event.title}
          </h3>
          
          <p className="text-gray-800 mb-4 text-sm">
            {event.description}
          </p>
          
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-aurora-green font-semibold">
                <Calendar className="mr-1" size={14} />
                {event.date}
              </div>
              <div className="flex items-center text-gray-400">
                <Clock className="mr-1" size={14} />
                {event.time}
              </div>
            </div>
            {event.distance && (
              <div className="text-xs text-gray-400">
                Distance: {event.distance}
              </div>
            )}
            {event.velocity && (
              <div className="text-xs text-gray-400">
                Velocity: {event.velocity}
              </div>
            )}
          </div>
          
          {/* Countdown Timer */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-space-blue/60 p-3 rounded-lg mb-4"
          >
            <div className="text-center">
              <motion.div
                key={countdown}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-stellar-gold"
              >
                {countdown}
              </motion.div>
              <div className="text-sm text-gray-400">Time remaining</div>
            </div>
          </motion.div>
          
          <Button className="w-full bg-stellar-gold text-space-blue py-2 rounded-full font-semibold hover:bg-aurora-green transition-colors duration-300">
            <Bell className="mr-2" size={16} />
            {event.action}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
