-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  current_level TEXT DEFAULT 'N5',
  xp INTEGER DEFAULT 0,
  rank TEXT DEFAULT 'Shoshinsha',
  characters_read INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create reading passages table
CREATE TABLE public.reading_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic TEXT NOT NULL,
  level TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  character_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reading_passages ENABLE ROW LEVEL SECURITY;

-- Reading passages policies
CREATE POLICY "Users can view their own passages" ON public.reading_passages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create passages" ON public.reading_passages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own passages" ON public.reading_passages FOR DELETE USING (auth.uid() = user_id);

-- Create vocabulary bank table
CREATE TABLE public.vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  word TEXT NOT NULL,
  reading TEXT,
  meaning TEXT NOT NULL,
  word_type TEXT,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;

-- Vocabulary policies
CREATE POLICY "Users can view their own vocabulary" ON public.vocabulary FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add vocabulary" ON public.vocabulary FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete vocabulary" ON public.vocabulary FOR DELETE USING (auth.uid() = user_id);

-- Create trigger for new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data ->> 'username');
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update XP and rank
CREATE OR REPLACE FUNCTION public.update_user_progress(
  p_user_id UUID,
  p_characters_read INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  new_xp INTEGER;
  new_rank TEXT;
BEGIN
  -- Update characters read and XP (1 char = 1 XP)
  UPDATE public.profiles
  SET 
    characters_read = characters_read + p_characters_read,
    xp = xp + p_characters_read,
    updated_at = now()
  WHERE id = p_user_id
  RETURNING xp INTO new_xp;

  -- Calculate new rank based on XP
  IF new_xp >= 50000 THEN
    new_rank := 'Tatsujin';
  ELSIF new_xp >= 25000 THEN
    new_rank := 'Sensei';
  ELSIF new_xp >= 10000 THEN
    new_rank := 'Jukurensha';
  ELSIF new_xp >= 5000 THEN
    new_rank := 'Chukyusha';
  ELSIF new_xp >= 1000 THEN
    new_rank := 'Gakusha';
  ELSE
    new_rank := 'Shoshinsha';
  END IF;

  -- Update rank
  UPDATE public.profiles
  SET rank = new_rank
  WHERE id = p_user_id;
END;
$$;