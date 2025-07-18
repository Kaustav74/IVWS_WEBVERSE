import { motion } from "framer-motion";
import { ChevronDown, Play, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarfieldBackground from "./starfield-background";
import { useParallax } from "@/hooks/use-parallax";

export default function HeroSection() {
  const scrollY = useParallax();
  
  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 z-0 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Deep space nebula background" 
          className="w-full h-full object-cover opacity-50" 
        />
      </div>

      {/* Animated Starfield */}
      <StarfieldBackground />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-20 right-10 text-stellar-gold text-3xl opacity-60"
      >
        ⭐
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2 
        }}
        className="absolute bottom-32 left-16 text-aurora-green text-2xl opacity-50"
      >
        🛰️
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
        className="absolute top-1/3 left-10 text-nebula-pink text-4xl opacity-40"
      >
        🌙
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 visible-text leading-tight"
        >
          <span className="block text-white">Experience Professional Astronomy with</span>
          <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-stellar-gold">
            StarScope
          </span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 visible-text"
        >
          Premium Stargazing & Astrophotography Services
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 visible-text max-w-3xl mx-auto leading-relaxed px-4"
        >
          Join us for unforgettable stargazing experiences through guided tours, 
          astrophotography sessions, and live celestial event streams.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <Button 
            className="bg-gradient-to-r from-stellar-gold to-aurora-green text-space-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:scale-105 transition-transform duration-300 animate-glow"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Telescope className="mr-2" size={18} />
            Start Stargazing
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-stellar-gold text-stellar-gold px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-stellar-gold hover:text-space-blue transition-all duration-300"
            onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play className="mr-2" size={18} />
            Watch Live Stream
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToServices}
            className="text-stellar-gold text-2xl hover:text-aurora-green transition-colors"
          >
            <ChevronDown />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
