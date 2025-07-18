import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription");
  };

  const footerSections = [
    {
      title: "Services",
      links: [
        "Guided Tours",
        "Astrophotography", 
        "Live Streams",
        "Webinars"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Booking Policy",
        "Safety Guidelines"
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { icon: Twitter, href: "#", color: "hover:text-blue-300" },
    { icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { icon: Youtube, href: "#", color: "hover:text-red-400" }
  ];

  return (
    <footer className="bg-space-blue/80 py-16 px-4 border-t border-stellar-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-stellar-gold mr-3">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m3.27 6.96 8.73 5.04 8.73-5.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-xl">StarScope</span>
            </div>
            <p className="text-gray-400 mb-4">
              Making astronomy accessible to everyone through immersive stargazing experiences.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2 }}
                  className={`text-stellar-gold ${social.color} transition-colors duration-300`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg mb-4 text-stellar-gold">
                {section.title}
              </h4>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a href="#" className="hover:text-white transition-colors duration-300">
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
          
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-lg mb-4 text-stellar-gold">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4">
              Get updates on celestial events and exclusive offers
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-cosmic-purple/40 border border-stellar-gold/30 rounded-l-full text-white placeholder-gray-400 focus:border-stellar-gold focus:outline-none"
                required
              />
              <Button
                type="submit"
                className="bg-stellar-gold text-space-blue px-6 py-2 rounded-r-full hover:bg-aurora-green transition-colors duration-300"
              >
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-stellar-gold/20 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 StarScope. All rights reserved. | Privacy Policy | Terms of Service</p>
        </motion.div>
      </div>
    </footer>
  );
}
