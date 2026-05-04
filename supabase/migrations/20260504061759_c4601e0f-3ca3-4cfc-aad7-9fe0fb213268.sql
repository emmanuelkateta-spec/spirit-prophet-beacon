
-- Tab chat groups
CREATE TABLE public.tab_chat_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tab_name TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  max_members INTEGER DEFAULT 0,
  created_by UUID NOT NULL,
  conversation_id UUID REFERENCES public.conversations(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tab chat group members
CREATE TABLE public.tab_chat_group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID NOT NULL REFERENCES public.tab_chat_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  added_by UUID,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Tab notifications
CREATE TABLE public.tab_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tab_name TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  posted_by UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.tab_chat_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tab_chat_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tab_notifications ENABLE ROW LEVEL SECURITY;

-- tab_chat_groups policies
CREATE POLICY "Admins manage tab chat groups" ON public.tab_chat_groups
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Members view their tab chat groups" ON public.tab_chat_groups
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.tab_chat_group_members
      WHERE tab_chat_group_members.group_id = tab_chat_groups.id
        AND tab_chat_group_members.user_id = auth.uid()
    )
  );

-- tab_chat_group_members policies
CREATE POLICY "Admins manage tab group members" ON public.tab_chat_group_members
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Members view own memberships" ON public.tab_chat_group_members
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- tab_notifications policies
CREATE POLICY "Admins manage notifications" ON public.tab_notifications
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Auth users view notifications" ON public.tab_notifications
  FOR SELECT TO authenticated USING (true);

-- Realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.tab_notifications;

-- Max members enforcement trigger
CREATE OR REPLACE FUNCTION public.check_tab_chat_group_limit()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  max_m INTEGER;
  current_count INTEGER;
BEGIN
  SELECT max_members INTO max_m FROM public.tab_chat_groups WHERE id = NEW.group_id;
  IF max_m > 0 THEN
    SELECT COUNT(*) INTO current_count FROM public.tab_chat_group_members WHERE group_id = NEW.group_id;
    IF current_count >= max_m THEN
      RAISE EXCEPTION 'Group has reached maximum of % members', max_m;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER enforce_tab_chat_group_limit
  BEFORE INSERT ON public.tab_chat_group_members
  FOR EACH ROW EXECUTE FUNCTION public.check_tab_chat_group_limit();

-- Auto-assign admin role to emmanuelkateta@gmail.com
CREATE OR REPLACE FUNCTION public.auto_assign_admin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.email = 'emmanuelkateta@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER assign_admin_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_assign_admin();
