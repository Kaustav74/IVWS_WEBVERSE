import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    setLocation("/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-space-blue/80 backdrop-blur-md border-b border-stellar-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-stellar-gold mr-3">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="m3.27 6.96 8.73 5.04 8.73-5.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-xl">StarScope</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="ml-10 flex items-baseline space-x-8"
            >
              <button
                onClick={() => scrollToSection("hero")}
                className="text-white hover:text-stellar-gold transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-white hover:text-stellar-gold transition-colors duration-300"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("membership")}
                className="text-white hover:text-stellar-gold transition-colors duration-300"
              >
                Membership
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="text-white hover:text-stellar-gold transition-colors duration-300"
              >
                Events
              </button>
              <Button
                onClick={handleLogin}
                className="bg-gradient-to-r from-stellar-gold to-aurora-green text-space-blue px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-300 animate-glow"
              >
                Login
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-stellar-gold transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-stellar-gold/20"
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left text-white hover:text-stellar-gold transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-white hover:text-stellar-gold transition-colors duration-300"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("membership")}
                className="text-left text-white hover:text-stellar-gold transition-colors duration-300"
              >
                Membership
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="text-left text-white hover:text-stellar-gold transition-colors duration-300"
              >
                Events
              </button>
              <Button
                onClick={handleLogin}
                className="bg-gradient-to-r from-stellar-gold to-aurora-green text-space-blue px-6 py-2 rounded-full font-semibold w-fit"
              >
                Login
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
