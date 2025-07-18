import { motion } from "framer-motion";
import { Clock, Users, Star, Camera, Download, Radio, MessageCircle, Globe, GraduationCap, Award, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Guided Stargazing Tours",
    description: "On-site stargazing sessions at observatories and dark-sky sites conducted by certified astronomy guides.",
    price: "From $75",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    features: [
      { icon: Star, text: "Observatory & dark-sky locations" },
      { icon: Users, text: "Certified astronomy guides" },
      { icon: MessageCircle, text: "Laser pointer tours & storytelling" }
    ]
  },
  {
    title: "Astrophotography Sessions",
    description: "Personalized astrophotography shoots with training workshops for amateur photographers.",
    price: "From $120",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    features: [
      { icon: Camera, text: "Personalized photo sessions" },
      { icon: Download, text: "Digital & printed frames" },
      { icon: GraduationCap, text: "Training workshops included" }
    ]
  },
  {
    title: "Live Celestial Event Streams",
    description: "Real-time streaming of eclipses, meteor showers, and planetary conjunctions with expert commentary.",
    price: "From $35",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    features: [
      { icon: Radio, text: "Major celestial events live" },
      { icon: Globe, text: "Global access for subscribers" },
      { icon: MessageCircle, text: "Expert commentary & Q&A" }
    ]
  },
  {
    title: "Educational Webinars",
    description: "Online and offline learning modules covering telescope handling, astrophysics, and night-sky navigation.",
    price: "From $45",
    image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    features: [
      { icon: GraduationCap, text: "Online & offline modules" },
      { icon: Award, text: "Telescope handling & astrophysics" },
      { icon: Users, text: "For students & enthusiasts" }
    ]
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-12 sm:py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 bg-gradient-to-r from-stellar-gold to-aurora-green bg-clip-text text-transparent">
            Our Cosmic Services
          </h2>
          <p className="text-lg sm:text-xl visible-text max-w-3xl mx-auto px-4">
            Establish your online presence with professional astronomy services - from guided tours to educational workshops
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <Card className="relative bg-gradient-to-br from-cosmic-purple/80 to-space-blue/80 border border-stellar-gold/20 hover:border-stellar-gold/60 transition-all duration-500 backdrop-blur-sm overflow-hidden">
                {/* Constellation lines that appear on hover */}
                <div className="constellation-line top-4 left-4 w-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: "rotate(45deg)" }}></div>
                <div className="constellation-line bottom-4 right-4 w-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: "rotate(-30deg)" }}></div>
                
                <CardContent className="p-8">
                  {/* Telescope viewfinder effect */}
                  <div className="telescope-viewfinder w-24 h-24 mx-auto mb-6 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <h3 className="font-semibold text-2xl mb-4 text-stellar-gold">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-800 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <feature.icon className="mr-2 text-aurora-green" size={16} />
                        {feature.text}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-stellar-gold text-space-blue py-3 rounded-full font-semibold hover:bg-aurora-green transition-colors duration-300"
                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Book - {service.price}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
