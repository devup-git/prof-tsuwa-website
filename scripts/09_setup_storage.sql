-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('cms_docs', 'cms_docs', true),
  ('cms_images', 'cms_images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for cms_docs
CREATE POLICY "Public Access Docs" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'cms_docs' );

CREATE POLICY "Admin Upload Docs" 
ON storage.objects FOR INSERT 
WITH CHECK ( 
  bucket_id = 'cms_docs' 
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Admin Update Docs" 
ON storage.objects FOR UPDATE
USING ( 
  bucket_id = 'cms_docs' 
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Admin Delete Docs" 
ON storage.objects FOR DELETE
USING ( 
  bucket_id = 'cms_docs' 
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- RLS Policies for cms_images
CREATE POLICY "Public Access Images" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'cms_images' );

CREATE POLICY "Admin Upload Images" 
ON storage.objects FOR INSERT 
WITH CHECK ( 
  bucket_id = 'cms_images' 
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Admin Update Images" 
ON storage.objects FOR UPDATE
USING ( 
  bucket_id = 'cms_images' 
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

CREATE POLICY "Admin Delete Images" 
ON storage.objects FOR DELETE
USING ( 
  bucket_id = 'cms_images' 
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
