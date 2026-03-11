import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, UserPlus, CheckCircle, Sparkles } from "lucide-react";
import { z } from "zod";

const studentSchema = z.object({
  full_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().regex(/^(\+91)?[0-9]{10}$/, "Phone must be 10 digits").optional().or(z.literal("")),
  current_grade: z.enum(["10th", "12th"], { required_error: "Please select your grade" }),
  stream: z.string().optional(),
  city: z.string().trim().max(100).optional(),
  state: z.string().trim().max(100).optional(),
  interests: z.string().trim().max(500).optional(),
  career_goals: z.string().trim().max(500).optional(),
  additional_notes: z.string().trim().max(1000).optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

const StudentForm = () => {
  const [formData, setFormData] = useState<Partial<StudentFormData>>({
    current_grade: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [careerSuggestions, setCareerSuggestions] = useState<string>("");
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = studentSchema.parse(formData);

      // Insert into database
      const { error } = await supabase.from("students").insert([{
        full_name: validatedData.full_name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        current_grade: validatedData.current_grade,
        stream: validatedData.stream || null,
        city: validatedData.city || null,
        state: validatedData.state || null,
        interests: validatedData.interests || null,
        career_goals: validatedData.career_goals || null,
        additional_notes: validatedData.additional_notes || null,
      }]);

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Success! 🎉",
        description: "Generating personalized career suggestions...",
      });

      // Generate career suggestions
      setIsLoadingSuggestions(true);
      try {
        const { data: suggestionsData, error: suggestionsError } = await supabase.functions.invoke('career-suggest', {
          body: { studentData: validatedData }
        });

        if (suggestionsError) throw suggestionsError;
        
        setCareerSuggestions(suggestionsData.suggestions);
      } catch (suggestionError) {
        console.error("Error generating suggestions:", suggestionError);
        toast({
          title: "Suggestions Not Available",
          description: "Your registration was successful, but we couldn't generate suggestions at this time.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingSuggestions(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        console.error("Error submitting form:", error);
        toast({
          title: "Submission Failed",
          description: "Unable to submit your information. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <section className="py-20 bg-background">
        <div className="container px-4">
          <Card className="max-w-4xl mx-auto border-2 border-accent">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-8">
                <CheckCircle className="w-20 h-20 text-accent mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Registration Successful!</h3>
                <p className="text-lg text-muted-foreground">
                  Your information has been submitted. Here are personalized career suggestions based on your profile.
                </p>
              </div>

              {isLoadingSuggestions ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">Analyzing your profile and generating suggestions...</p>
                </div>
              ) : careerSuggestions ? (
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <h4 className="text-xl font-semibold">Your Personalized Career Suggestions</h4>
                  </div>
                  <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                    {careerSuggestions}
                  </div>
                </div>
              ) : null}

              <Button
                onClick={() => {
                  setFormData({ current_grade: undefined });
                  setIsSuccess(false);
                  setCareerSuggestions("");
                }}
                className="mt-8 mx-auto block"
                size="lg"
              >
                Submit Another Form
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <UserPlus className="w-4 h-4" />
            <span className="text-sm font-semibold">Get Personalized Guidance</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Register for Career Counseling</h2>
          <p className="text-xl text-muted-foreground">
            Share your details and our expert counselors will provide personalized career guidance
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-2 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Student Information</CardTitle>
            <CardDescription>Fill in your details to get started with personalized career guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      placeholder="Enter your full name"
                      value={formData.full_name || ""}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="userName@example.com"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+919876543210"
                      maxLength={13}
                      value={formData.phone || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only digits and + symbol
                        const filtered = value.replace(/[^\d+]/g, "");
                        handleInputChange("phone", filtered);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="current_grade">
                      Current Grade <span className="text-destructive">*</span>
                    </Label>
                    <Select value={formData.current_grade} onValueChange={(value) => handleInputChange("current_grade", value)}>
                      <SelectTrigger id="current_grade" className="bg-background">
                        <SelectValue placeholder="Select your grade" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="10th">10th Standard</SelectItem>
                        <SelectItem value="12th">12th Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stream">Stream (if in 12th)</Label>
                    <Input
                      id="stream"
                      placeholder="e.g., Science PCM, Commerce"
                      value={formData.stream || ""}
                      onChange={(e) => handleInputChange("stream", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Your city"
                      value={formData.city || ""}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Your state"
                    value={formData.state || ""}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </div>
              </div>

              {/* Career Information */}
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="interests">Interests & Favorite Subjects</Label>
                  <Textarea
                    id="interests"
                    placeholder="Tell us about your interests, hobbies, and favorite subjects..."
                    value={formData.interests || ""}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                    rows={3}
                    maxLength={500}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="career_goals">Career Goals</Label>
                  <Textarea
                    id="career_goals"
                    placeholder="What career are you interested in? Any specific goals?"
                    value={formData.career_goals || ""}
                    onChange={(e) => handleInputChange("career_goals", e.target.value)}
                    rows={3}
                    maxLength={500}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional_notes">Additional Notes</Label>
                  <Textarea
                    id="additional_notes"
                    placeholder="Any specific questions or concerns you'd like to discuss?"
                    value={formData.additional_notes || ""}
                    onChange={(e) => handleInputChange("additional_notes", e.target.value)}
                    rows={3}
                    maxLength={1000}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 w-5 h-5" />
                    Submit Registration
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting this form, you agree to be contacted by our career counseling team.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default StudentForm;
