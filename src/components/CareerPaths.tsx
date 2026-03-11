import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

const paths = [
  {
    title: "After 10th Standard",
    description: "Choose the right stream and foundation for your career",
    icon: BookOpen,
    options: [
      { name: "Science Stream", desc: "PCM, PCB for Engineering & Medical" },
      { name: "Commerce Stream", desc: "Accounting, Business & Economics" },
      { name: "Arts/Humanities", desc: "Literature, Social Sciences & Liberal Arts" },
      { name: "Vocational Courses", desc: "ITI, Polytechnic & Skill Development" },
    ],
    color: "primary",
  },
  {
    title: "After 12th Standard",
    description: "Step into higher education and professional courses",
    icon: GraduationCap,
    options: [
      { name: "Engineering", desc: "B.Tech, B.E in multiple specializations" },
      { name: "Medical", desc: "MBBS, BDS, Nursing, Pharmacy" },
      { name: "Management", desc: "BBA, MBA preparation courses" },
      { name: "Law & Civil Services", desc: "LLB, UPSC preparation" },
    ],
    color: "secondary",
  },
];

const CareerPaths = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">Career Pathways</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Journey Starts Here</h2>
          <p className="text-xl text-muted-foreground">
            Explore tailored career options based on your current academic stage
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-${path.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-7 h-7 text-${path.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{path.title}</CardTitle>
                  <CardDescription className="text-base">{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {path.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{option.name}</h4>
                            <p className="text-sm text-muted-foreground">{option.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" variant={path.color === "primary" ? "default" : "secondary"}>
                    <Briefcase className="w-4 h-4 mr-2" />
                    Explore {path.title.split(" ")[1]} Careers
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerPaths;
