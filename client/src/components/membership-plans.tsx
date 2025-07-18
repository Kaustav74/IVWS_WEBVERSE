import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const plans = [
  {
    name: "Stargazer",
    subtitle: "Monthly subscription for casual astronomy enthusiasts",
    price: 29,
    features: [
      "Early booking access to tours",
      "Basic educational webinars",
      "Mobile constellation app",
      "Community forum access",
      "Email support",
      "Monthly astrophotography wallpapers"
    ],
    featured: false
  },
  {
    name: "Explorer",
    subtitle: "Enhanced benefits for dedicated sky watchers",
    price: 59,
    features: [
      "All Stargazer benefits",
      "Priority booking access",
      "Exclusive live stream events",
      "Advanced webinar modules",
      "Discounted astrophotography sessions",
      "High-resolution image downloads"
    ],
    featured: true
  },
  {
    name: "Cosmic Pro",
    subtitle: "Annual membership with premium perks and exclusive access",
    price: 99,
    features: [
      "All Explorer benefits",
      "Maximum booking priority",
      "Private celestial event streams",
      "Professional astrophotography discounts",
      "Expert 1-on-1 consultations",
      "Annual printed astrophotography calendar"
    ],
    featured: false
  }
];

export default function MembershipPlans() {
  return (
    <section id="membership" className="py-12 sm:py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 bg-gradient-to-r from-stellar-gold to-aurora-green bg-clip-text text-transparent">
            Membership Plans
          </h2>
          <p className="text-lg sm:text-xl visible-text max-w-3xl mx-auto px-4">
            Monthly and annual subscriptions with early booking access, discounts, and exclusive benefits
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              {plan.featured && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-stellar-gold text-space-blue px-4 py-1 rounded-full text-sm font-semibold z-10"
                >
                  Most Popular
                </motion.div>
              )}
              
              <Card className={`relative ${
                plan.featured 
                  ? "bg-gradient-to-br from-stellar-gold/20 to-aurora-green/20 border-2 border-stellar-gold animate-pulse-glow" 
                  : "bg-gradient-to-br from-cosmic-purple/60 to-space-blue/60 border border-stellar-gold/30"
              } hover:border-stellar-gold/60 transition-all duration-500 backdrop-blur-sm overflow-hidden`}>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-2">
                      <h3 className="font-semibold text-2xl text-stellar-gold">
                        {plan.name}
                      </h3>
                      {plan.featured && (
                        <Star className="ml-2 text-stellar-gold" size={20} />
                      )}
                    </div>
                    <p className="text-gray-800 mb-4">{plan.subtitle}</p>
                    <div className="text-4xl font-bold mb-2">
                      ${plan.price}
                      <span className="text-lg font-normal">/month</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center"
                      >
                        <Check className="text-aurora-green mr-3 flex-shrink-0" size={16} />
                        <span className="text-gray-800">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                      plan.featured
                        ? "bg-gradient-to-r from-stellar-gold to-aurora-green text-space-blue hover:scale-105"
                        : "bg-stellar-gold text-space-blue hover:bg-aurora-green"
                    }`}
                  >
                    Choose Plan
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
