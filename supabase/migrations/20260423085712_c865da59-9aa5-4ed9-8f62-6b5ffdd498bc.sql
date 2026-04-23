
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  age_group TEXT,
  how_heard TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert memberships" ON public.memberships FOR INSERT WITH CHECK (true);

CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT,
  partnership_type TEXT,
  monthly_pledge TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert partners" ON public.partners FOR INSERT WITH CHECK (true);

CREATE TABLE public.bible_study_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_day TEXT,
  level TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bible_study_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert bible study" ON public.bible_study_registrations FOR INSERT WITH CHECK (true);

CREATE TABLE public.soul_winners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT,
  availability TEXT,
  why_join TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.soul_winners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert soul winners" ON public.soul_winners FOR INSERT WITH CHECK (true);
