-- Create students information table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  current_grade TEXT NOT NULL CHECK (current_grade IN ('10th', '12th')),
  stream TEXT,
  city TEXT,
  state TEXT,
  interests TEXT,
  career_goals TEXT,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their own data (for form submissions)
CREATE POLICY "Anyone can submit student information"
ON public.students
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow students to view their own data (if they're authenticated)
CREATE POLICY "Users can view their own student info"
ON public.students
FOR SELECT
TO authenticated
USING (email = auth.jwt()->>'email');

-- Create index for faster lookups
CREATE INDEX idx_students_email ON public.students(email);
CREATE INDEX idx_students_created_at ON public.students(created_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_students_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_students_updated_at();