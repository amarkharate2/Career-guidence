import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <Card className="max-w-4xl mx-auto overflow-hidden border-2 shadow-xl">
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Free Career Assessment</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Not Sure Which Path to Choose?
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Take our comprehensive career assessment test designed specifically for Indian students. Get personalized
                recommendations based on your interests, skills, and goals.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="hero" className="group">
                  Take Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur-sm">
                  Talk to a Counselor
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mt-6">
                ✓ 10-minute assessment ✓ Instant results ✓ Personalized guidance
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTASection;
