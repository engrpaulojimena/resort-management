import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import AmenitiesSection from '@/components/AmenitiesSection'
import AccommodationsSection from '@/components/AccommodationsSection'
import BookingCTA from '@/components/BookingCTA'
import TestimonialsSection from '@/components/TestimonialsSection'
import LocationSection from '@/components/LocationSection'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <AmenitiesSection />
      <AccommodationsSection />
      <BookingCTA />
      <TestimonialsSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
