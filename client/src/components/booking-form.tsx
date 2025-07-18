import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const services = [
  { value: "guided-tours", label: "Guided Stargazing Tours", price: "From $75" },
  { value: "astrophotography", label: "Astrophotography Sessions", price: "From $120" },
  { value: "live-streams", label: "Live Celestial Event Streams", price: "From $35" },
  { value: "webinars", label: "Educational Webinars", price: "From $45" }
];

const timeSlots = [
  "6:00 PM - 9:00 PM",
  "7:00 PM - 10:00 PM", 
  "8:00 PM - 11:00 PM",
  "9:00 PM - 12:00 AM"
];

interface BookingFormData {
  serviceType: string;
  date: string;
  timeSlot: string;
  participants: number;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    serviceType: "",
    date: "",
    timeSlot: "",
    participants: 1,
    name: "",
    email: "",
    phone: "",
    specialRequests: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const bookingMutation = useMutation({
    mutationFn: async (data: BookingFormData) => {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // Demo user - in real app this would come from auth
          serviceType: data.serviceType,
          date: new Date(data.date + 'T' + data.timeSlot.split(' - ')[0]),
          participants: data.participants,
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.phone,
          specialRequests: data.specialRequests,
          status: 'pending'
        })
      });
      if (!response.ok) throw new Error('Booking failed');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Booking Submitted!",
        description: "We'll contact you within 24 hours to confirm your stargazing experience.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      // Reset form
      setFormData({
        serviceType: "",
        date: "",
        timeSlot: "",
        participants: 1,
        name: "",
        email: "",
        phone: "",
        specialRequests: ""
      });
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookingMutation.mutate(formData);
  };

  const updateFormData = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="booking" className="py-12 sm:py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 bg-gradient-to-r from-stellar-gold to-aurora-green bg-clip-text text-transparent">
            Book Your Experience
          </h2>
          <p className="text-lg sm:text-xl visible-text max-w-3xl mx-auto px-4">
            Reserve your spot for an unforgettable journey through the cosmos
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-br from-cosmic-purple/80 to-space-blue/80 border border-stellar-gold/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-stellar-gold" />
                Streamlined Booking Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-white">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Service Type
                    </Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => updateFormData('serviceType', value)}
                    >
                      <SelectTrigger className="bg-space-blue/50 border-stellar-gold/30 text-white">
                        <SelectValue placeholder="Choose your experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label} - {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-white">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Preferred Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateFormData('date', e.target.value)}
                      className="bg-space-blue/50 border-stellar-gold/30 text-white"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-white">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Time Slot
                    </Label>
                    <Select
                      value={formData.timeSlot}
                      onValueChange={(value) => updateFormData('timeSlot', value)}
                    >
                      <SelectTrigger className="bg-space-blue/50 border-stellar-gold/30 text-white">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Participants */}
                  <div className="space-y-2">
                    <Label htmlFor="participants" className="text-white">
                      <Users className="w-4 h-4 inline mr-2" />
                      Number of Participants
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      max="12"
                      value={formData.participants}
                      onChange={(e) => updateFormData('participants', parseInt(e.target.value))}
                      className="bg-space-blue/50 border-stellar-gold/30 text-white"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Full Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="bg-space-blue/50 border-stellar-gold/30 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="bg-space-blue/50 border-stellar-gold/30 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="bg-space-blue/50 border-stellar-gold/30 text-white"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="requests" className="text-white">Special Requests or Questions</Label>
                  <Textarea
                    value={formData.specialRequests}
                    onChange={(e) => updateFormData('specialRequests', e.target.value)}
                    className="bg-space-blue/50 border-stellar-gold/30 text-white"
                    placeholder="Any special accommodations, experience level, or questions..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={bookingMutation.isPending}
                  className="w-full bg-gradient-to-r from-stellar-gold to-aurora-green hover:from-stellar-gold/80 hover:to-aurora-green/80 text-black font-semibold py-3 text-lg transition-all duration-300"
                >
                  {bookingMutation.isPending ? "Processing..." : "Book Experience"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}