
-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name text NOT NULL DEFAULT '',
  avatar_url text,
  phone text,
  bio text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email));
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Tablet modules access
CREATE TABLE public.tablet_modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  module_name text NOT NULL,
  granted_at timestamptz NOT NULL DEFAULT now(),
  granted_by uuid,
  UNIQUE(user_id, module_name)
);
ALTER TABLE public.tablet_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own modules" ON public.tablet_modules FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage modules" ON public.tablet_modules FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Conversations
CREATE TABLE public.conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'direct',
  name text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.conversation_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(conversation_id, user_id)
);
ALTER TABLE public.conversation_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their conversations" ON public.conversations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.conversation_members WHERE conversation_id = id AND user_id = auth.uid()));
CREATE POLICY "Admins can manage conversations" ON public.conversations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Auth users can create conversations" ON public.conversations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Members can view conversation members" ON public.conversation_members FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.conversation_members cm WHERE cm.conversation_id = conversation_id AND cm.user_id = auth.uid()));
CREATE POLICY "Admins can manage conv members" ON public.conversation_members FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can join conversations" ON public.conversation_members FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Messages
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members can view messages" ON public.messages FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.conversation_members WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()));
CREATE POLICY "Members can send messages" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id AND EXISTS (SELECT 1 FROM public.conversation_members WHERE conversation_id = messages.conversation_id AND user_id = auth.uid()));
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- 12 for 12 groups (create both tables first, then policies)
CREATE TABLE public.groups_12for12 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  conversation_id uuid REFERENCES public.conversations(id) ON DELETE SET NULL,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.groups_12for12 ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.group_12for12_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES public.groups_12for12(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);
ALTER TABLE public.group_12for12_members ENABLE ROW LEVEL SECURITY;

-- Now policies for both
CREATE POLICY "Members can view 12for12 groups" ON public.groups_12for12 FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.group_12for12_members WHERE group_id = id AND user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage 12for12" ON public.groups_12for12 FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Members view group members" ON public.group_12for12_members FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.group_12for12_members gm WHERE gm.group_id = group_id AND gm.user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage group members" ON public.group_12for12_members FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.check_12for12_limit()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.group_12for12_members WHERE group_id = NEW.group_id) >= 12 THEN
    RAISE EXCEPTION 'Group cannot exceed 12 members';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER enforce_12for12_limit BEFORE INSERT ON public.group_12for12_members
  FOR EACH ROW EXECUTE FUNCTION public.check_12for12_limit();

-- Group announcements
CREATE TABLE public.group_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES public.groups_12for12(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL, content text NOT NULL, posted_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.group_announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Group members view announcements" ON public.group_announcements FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.group_12for12_members WHERE group_id = group_announcements.group_id AND user_id = auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage announcements" ON public.group_announcements FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Management
CREATE TABLE public.management_discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, content text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  created_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.management_discussions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Mgmt view discussions" ON public.management_discussions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.tablet_modules WHERE user_id = auth.uid() AND module_name = 'SFM Management') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Mgmt create discussions" ON public.management_discussions FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.tablet_modules WHERE user_id = auth.uid() AND module_name = 'SFM Management') OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.management_minutes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, content text NOT NULL, meeting_date date NOT NULL,
  recorded_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.management_minutes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Mgmt view minutes" ON public.management_minutes FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.tablet_modules WHERE user_id = auth.uid() AND module_name = 'SFM Management') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage minutes" ON public.management_minutes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.management_meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, description text, meeting_date timestamptz NOT NULL,
  location text, agenda text,
  status text NOT NULL DEFAULT 'scheduled',
  created_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.management_meetings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Mgmt view meetings" ON public.management_meetings FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.tablet_modules WHERE user_id = auth.uid() AND module_name = 'SFM Management') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage meetings" ON public.management_meetings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Tablet events
CREATE TABLE public.tablet_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL, description text, event_date timestamptz NOT NULL,
  end_date timestamptz, location text, image_url text, category text,
  created_by uuid NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tablet_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth view events" ON public.tablet_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins manage events" ON public.tablet_events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Engagement
CREATE TABLE public.engagement_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL, action_type text NOT NULL, points integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.engagement_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View engagement" ON public.engagement_points FOR SELECT TO authenticated USING (true);
CREATE POLICY "Insert engagement" ON public.engagement_points FOR INSERT TO authenticated WITH CHECK (true);

-- Enquiries
CREATE TABLE public.tablet_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, email text, phone text, message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.tablet_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submit enquiry" ON public.tablet_enquiries FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins view enquiries" ON public.tablet_enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
