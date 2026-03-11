import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Atom, Calculator, Palette, Users } from "lucide-react";

const streams = [
  {
    name: "Science",
    icon: Atom,
    color: "primary",
    description: "For analytical minds and problem solvers",
    branches: ["PCM - Engineering", "PCB - Medical", "PCM+B - Research"],
    careers: ["Engineer", "Doctor", "Scientist", "Researcher", "Architect"],
    popularity: "Most Popular",
  },
  {
    name: "Commerce",
    icon: Calculator,
    color: "secondary",
    description: "For business-minded and finance enthusiasts",
    branches: ["Accounting", "Economics", "Business Studies"],
    careers: ["CA", "CS", "Economist", "Banker", "Entrepreneur"],
    popularity: "High Demand",
  },
  {
    name: "Arts/Humanities",
    icon: Palette,
    color: "accent",
    description: "For creative thinkers and social change makers",
    branches: ["Literature", "History", "Political Science"],
    careers: ["Lawyer", "IAS Officer", "Journalist", "Psychologist", "Designer"],
    popularity: "Diverse Options",
  },
  {
    name: "Vocational",
    icon: Users,
    color: "primary",
    description: "For hands-on learning and quick employment",
    branches: ["ITI", "Diploma", "Skill Training"],
    careers: ["Technician", "Electrician", "Designer", "Chef", "Fashion Designer"],
    popularity: "Job Ready",
  },
];

const StreamOptions = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Stream</h2>
          <p className="text-xl text-muted-foreground">
            Understanding different streams helps you make an informed decision about your future
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {streams.map((stream, index) => {
            const Icon = stream.icon;
            return (
              <Card
                key={index}
                className="relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group bg-card"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className="w-fit mb-2" variant="secondary">
                    {stream.popularity}
                  </Badge>
                  <CardTitle className="text-xl">{stream.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{stream.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Key Branches:</h4>
                      <div className="space-y-1">
                        {stream.branches.map((branch, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {branch}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground">Top Careers:</h4>
                      <div className="flex flex-wrap gap-1">
                        {stream.careers.slice(0, 3).map((career, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {career}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StreamOptions;
