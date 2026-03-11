import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Loader2, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

const Booking = () => {
  const { user } = useAuth();
  const [date, setDate] = useState<Date>();
  const [sessionType, setSessionType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const sessionTypes = [
    { value: "career-guidance", label: "Career Guidance" },
    { value: "stream-selection", label: "Stream Selection" },
    { value: "college-admission", label: "College Admission" },
    { value: "exam-preparation", label: "Exam Preparation" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a session",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!date || !sessionType || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const [hours, minutes, period] = timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/)?.slice(1) || [];
      let hour = parseInt(hours);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      const sessionDate = new Date(date);
      sessionDate.setHours(hour, parseInt(minutes), 0, 0);

      const { error } = await supabase.from("counseling_sessions").insert({
        student_id: user.id,
        session_date: sessionDate.toISOString(),
        session_type: sessionType,
        status: "scheduled",
        duration_minutes: 60,
      });

      if (error) throw error;

      toast({
        title: "Session Booked Successfully!",
        description: "Your counseling session has been scheduled",
      });
      navigate("/student-portal");
    } catch (error) {
      console.error("Error booking session:", error);
      toast({
        title: "Booking Failed",
        description: "Unable to book your session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              Book a Counseling Session
            </CardTitle>
            <CardDescription>
              Schedule a personalized career counseling session with our experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Session Type</Label>
                <Select value={sessionType} onValueChange={setSessionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                  className="rounded-md border"
                />
              </div>

              {date && (
                <div className="space-y-2">
                  <Label>Select Time Slot</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
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
              )}

              {date && timeSlot && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <p className="font-medium">Your Session Details:</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {format(date, "PPPP")} at {timeSlot}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Duration: 60 minutes
                    </p>
                  </CardContent>
                </Card>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Booking;
