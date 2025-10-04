-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  student_id TEXT UNIQUE,
  department TEXT,
  semester INTEGER,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'faculty', 'admin')),
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create fee information table
CREATE TABLE public.fee_deadlines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  due_date DATE NOT NULL,
  late_fee DECIMAL(10, 2),
  description TEXT,
  applicable_to TEXT[], -- departments or 'all'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.fee_deadlines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view fee deadlines"
  ON public.fee_deadlines FOR SELECT
  USING (true);

-- Create student fee payments table
CREATE TABLE public.fee_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  fee_deadline_id UUID REFERENCES public.fee_deadlines(id) ON DELETE CASCADE,
  amount_paid DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payment_method TEXT,
  transaction_id TEXT,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed'))
);

ALTER TABLE public.fee_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own payments"
  ON public.fee_payments FOR SELECT
  USING (auth.uid() = student_id);

-- Create admissions information table
CREATE TABLE public.admissions_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program_name TEXT NOT NULL,
  eligibility TEXT NOT NULL,
  fee_structure TEXT NOT NULL,
  duration TEXT NOT NULL,
  seats_available INTEGER,
  application_deadline DATE,
  description TEXT,
  requirements TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.admissions_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view admissions info"
  ON public.admissions_info FOR SELECT
  USING (true);

-- Insert sample data
INSERT INTO public.fee_deadlines (title, amount, due_date, late_fee, description, applicable_to) VALUES
('Semester 1 Fees 2025', 45000.00, '2025-08-15', 2000.00, 'First semester fees including tuition and exam fees', ARRAY['all']),
('Semester 2 Fees 2025', 45000.00, '2026-01-15', 2000.00, 'Second semester fees including tuition and exam fees', ARRAY['all']),
('Library Deposit', 2000.00, '2025-08-01', 0.00, 'Refundable library deposit', ARRAY['all']);

INSERT INTO public.admissions_info (program_name, eligibility, fee_structure, duration, seats_available, application_deadline, description, requirements) VALUES
('Bachelor of Computer Applications (BCA)', '10+2 with Mathematics', '₹45,000 per semester', '3 years', 60, '2025-07-31', 'Professional degree program in computer applications', ARRAY['HSC marksheet', 'Aadhar card', 'Passport photos', 'Migration certificate']),
('Bachelor of Management Studies (BMS)', '10+2 any stream', '₹42,000 per semester', '3 years', 80, '2025-07-31', 'Comprehensive management education program', ARRAY['HSC marksheet', 'Aadhar card', 'Passport photos', 'Migration certificate']),
('Bachelor of Science (B.SC)', '10+2 with Science', '₹38,000 per semester', '3 years', 100, '2025-07-31', 'Science degree in various specializations', ARRAY['HSC marksheet', 'Aadhar card', 'Passport photos', 'Migration certificate']),
('Bachelor of Mass Media (BMM)', '10+2 any stream', '₹48,000 per semester', '3 years', 60, '2025-07-31', 'Media and communication degree program', ARRAY['HSC marksheet', 'Aadhar card', 'Passport photos', 'Migration certificate']);