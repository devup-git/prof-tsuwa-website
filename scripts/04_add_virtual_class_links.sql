-- Add virtual class link columns to student_resources table
ALTER TABLE student_resources 
ADD COLUMN IF NOT EXISTS virtual_class_link TEXT,
ADD COLUMN IF NOT EXISTS link_type TEXT; -- 'zoom', 'google_meet', 'teams', 'other'

-- Add comment for documentation
COMMENT ON COLUMN student_resources.virtual_class_link IS 'URL link to virtual class (Zoom, Google Meet, etc)';
COMMENT ON COLUMN student_resources.link_type IS 'Type of virtual class platform: zoom, google_meet, teams, other';
