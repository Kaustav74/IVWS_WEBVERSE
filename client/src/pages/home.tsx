import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ConstellationMap from "@/components/constellation-map";
import BookingForm from "@/components/booking-form";
import MembershipPlans from "@/components/membership-plans";
import EventsSection from "@/components/events-section";
import FloatingActionButton from "@/components/floating-action-button";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-space-blue">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ConstellationMap />
      <BookingForm />
      <MembershipPlans />
      <EventsSection />
      <FloatingActionButton />
      <Footer />
    </div>
  );
}
