import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-career.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-semibold">Your Future Starts Here</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Shape Your <span className="text-primary">Career Path</span> with Confidence
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Comprehensive career guidance for 10th and 12th grade students. Discover the perfect career path, explore
            streams, and make informed decisions about your future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group">
              Explore Career Paths
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="backdrop-blur-sm bg-background/50">
              Take Assessment
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">500+</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Career Options</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">10K+</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Students Guided</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">100%</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Free Resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
