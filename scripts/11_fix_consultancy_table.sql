CREATE TABLE IF NOT EXISTS consultancy_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE consultancy_services ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE tablename = 'consultancy_services' 
        AND policyname = 'Public can view consultancy_services'
    ) THEN
        CREATE POLICY "Public can view consultancy_services" ON consultancy_services FOR SELECT USING (true);
    END IF;
END
$$;
