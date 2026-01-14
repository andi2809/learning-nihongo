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

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Create reading_passages table
CREATE TABLE public.reading_passages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  level TEXT NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  character_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on reading_passages
ALTER TABLE public.reading_passages ENABLE ROW LEVEL SECURITY;

-- Reading passages policies
CREATE POLICY "Users can view their own passages"
ON public.reading_passages FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own passages"
ON public.reading_passages FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own passages"
ON public.reading_passages FOR DELETE
USING (auth.uid() = user_id);

-- Create vocabulary table
CREATE TABLE public.vocabulary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  reading TEXT,
  meaning TEXT NOT NULL,
  word_type TEXT,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on vocabulary
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;

-- Vocabulary policies
CREATE POLICY "Users can view their own vocabulary"
ON public.vocabulary FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vocabulary"
ON public.vocabulary FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vocabulary"
ON public.vocabulary FOR DELETE
USING (auth.uid() = user_id);

-- Function to update user progress
CREATE OR REPLACE FUNCTION public.update_user_progress(p_user_id UUID, p_characters_read INTEGER)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_xp INTEGER;
  new_chars INTEGER;
  new_rank TEXT;
BEGIN
  -- Get current values and update
  UPDATE public.profiles
  SET 
    xp = xp + p_characters_read,
    characters_read = characters_read + p_characters_read,
    updated_at = now()
  WHERE id = p_user_id
  RETURNING xp, characters_read INTO new_xp, new_chars;

  -- Update rank based on XP
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

  UPDATE public.profiles SET rank = new_rank WHERE id = p_user_id;
END;
$$;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data ->> 'username');
  RETURN new;
END;
$$;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();