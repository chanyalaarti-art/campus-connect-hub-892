-- Create enum for application status
CREATE TYPE application_status AS ENUM ('pending', 'approved', 'rejected');

-- Create applications table
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  address TEXT NOT NULL,
  course TEXT NOT NULL,
  department TEXT NOT NULL,
  documents JSONB DEFAULT '[]'::jsonb,
  status application_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own applications"
  ON public.applications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON public.applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending applications"
  ON public.applications
  FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for application status updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.applications;

-- Create storage bucket for application documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('application-documents', 'application-documents', false);

-- Storage policies for application documents
CREATE POLICY "Users can upload their own application documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'application-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own application documents"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'application-documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );