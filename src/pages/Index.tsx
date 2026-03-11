import Hero from "@/components/Hero";
import CareerPaths from "@/components/CareerPaths";
import StreamOptions from "@/components/StreamOptions";
import StudentForm from "@/components/StudentForm";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CareerChatbot from "@/components/CareerChatbot";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CareerPaths />
      <StreamOptions />
      <StudentForm />
      <CTASection />
      <Footer />
      <CareerChatbot />
    </div>
  );
};

export default Index;
