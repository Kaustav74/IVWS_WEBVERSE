import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, MessageSquare, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const helpOptions = [
    {
      icon: MessageSquare,
      label: "Live Chat",
      action: () => console.log("Open live chat"),
      color: "bg-aurora-green"
    },
    {
      icon: Phone,
      label: "Call Us",
      action: () => console.log("Initiate call"),
      color: "bg-stellar-gold"
    },
    {
      icon: Mail,
      label: "Email",
      action: () => console.log("Open email"),
      color: "bg-nebula-pink"
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="relative">
        {/* Orbiting elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-16 h-16 pointer-events-none"
          style={{ transformOrigin: "center" }}
        >
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-stellar-gold rounded-full transform -translate-x-1/2 -translate-y-8"></div>
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 w-20 h-20 pointer-events-none"
          style={{ transformOrigin: "center" }}
        >
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-aurora-green rounded-full transform -translate-x-1/2 -translate-y-10"></div>
        </motion.div>

        {/* Help Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-20 right-0 space-y-3"
            >
              {helpOptions.map((option, index) => (
                <motion.div
                  key={option.label}
                  initial={{ scale: 0, x: 20, opacity: 0 }}
                  animate={{ scale: 1, x: 0, opacity: 1 }}
                  exit={{ scale: 0, x: 20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <span className="bg-space-blue/80 backdrop-blur-md text-white px-3 py-2 rounded-full text-sm whitespace-nowrap border border-stellar-gold/20">
                    {option.label}
                  </span>
                  <Button
                    onClick={option.action}
                    className={`w-12 h-12 rounded-full ${option.color} text-space-blue hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <option.icon size={20} />
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-stellar-gold to-aurora-green text-space-blue hover:from-aurora-green hover:to-stellar-gold transition-all duration-300 shadow-lg relative z-10"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X size={24} /> : <HelpCircle size={24} />}
            </motion.div>
          </Button>
        </motion.div>

        {/* Pulsing ring effect */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 w-16 h-16 rounded-full border-2 border-stellar-gold"
          />
        )}
      </div>
    </div>
  );
}
