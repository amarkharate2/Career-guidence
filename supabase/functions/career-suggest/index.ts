import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating career suggestions for student:", studentData.full_name);

    const prompt = `Based on the following student information, suggest 3-5 appropriate career streams and paths:

Student Details:
- Name: ${studentData.full_name}
- Current Grade: ${studentData.current_grade}
- Stream: ${studentData.stream || "Not specified"}
- Interests: ${studentData.interests || "Not specified"}
- Career Goals: ${studentData.career_goals || "Not specified"}
- City: ${studentData.city || "Not specified"}
- State: ${studentData.state || "Not specified"}

Provide detailed, personalized career suggestions considering:
1. The student's current grade and stream
2. Their interests and hobbies
3. Their career aspirations
4. Relevant entrance exams and colleges in India
5. Job prospects and future scope

Format your response as actionable career paths with specific recommendations.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert Indian career counselor specializing in guiding 10th and 12th standard students. Provide detailed, practical, and encouraging career suggestions based on student profiles. Focus on Indian education system, entrance exams (JEE, NEET, CLAT, etc.), top colleges, and realistic career paths.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please contact support." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const suggestions = data.choices[0].message.content;

    console.log("Successfully generated career suggestions");

    return new Response(
      JSON.stringify({ suggestions }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in career-suggest function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
