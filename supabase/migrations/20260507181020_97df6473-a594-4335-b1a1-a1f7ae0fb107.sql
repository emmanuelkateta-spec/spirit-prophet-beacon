
-- Event registrations table
CREATE TABLE public.event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  event_title TEXT NOT NULL,
  guests INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert event registrations" ON public.event_registrations FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view event registrations" ON public.event_registrations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_date TEXT NOT NULL,
  preferred_time TEXT,
  purpose TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert appointments" ON public.appointments FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view appointments" ON public.appointments FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  category TEXT,
  testimony_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert testimonials" ON public.testimonials FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view testimonials" ON public.testimonials FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
