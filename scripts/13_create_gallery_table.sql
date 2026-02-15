DO $$ 
BEGIN
    -- Create gallery table if not exists
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'gallery') THEN
        CREATE TABLE public.gallery (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            image_url TEXT NOT NULL,
            caption TEXT,
            category TEXT DEFAULT 'General',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
        );
    END IF;

    -- Enable RLS
    ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies to recreate them safely
    DROP POLICY IF EXISTS "Allow public read access" ON public.gallery;
    DROP POLICY IF EXISTS "Allow admin all access" ON public.gallery;

    -- Create policies
    CREATE POLICY "Allow public read access" ON public.gallery
        FOR SELECT USING (true);

    CREATE POLICY "Allow admin all access" ON public.gallery
        USING (auth.role() = 'authenticated');
END $$;
