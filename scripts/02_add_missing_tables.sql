-- Create research_projects table
CREATE TABLE research_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  abstract TEXT,
  status TEXT NOT NULL, -- 'ongoing', 'completed'
  start_date DATE,
  end_date DATE,
  collaborators TEXT[],
  funding_source TEXT,
  funding_amount DECIMAL,
  research_areas TEXT[],
  publications_url TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create research_grants table
CREATE TABLE research_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  funding_agency TEXT NOT NULL,
  amount DECIMAL NOT NULL,
  year INTEGER NOT NULL,
  status TEXT, -- 'awarded', 'pending', 'completed'
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create student_resources table
CREATE TABLE student_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'lecture_notes', 'course_materials', 'slides', 'assignments'
  course_code TEXT,
  file_url TEXT,
  file_type TEXT, -- 'pdf', 'doc', 'pptx', etc
  upload_date DATE,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create student_submissions table (for assignment submissions)
CREATE TABLE student_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  assignment_title TEXT NOT NULL,
  course_code TEXT,
  file_url TEXT,
  submission_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create supervisees table
CREATE TABLE supervisees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  level TEXT NOT NULL, -- 'postgraduate', 'phd', 'research'
  start_year INTEGER,
  completion_year INTEGER,
  status TEXT, -- 'ongoing', 'completed'
  research_area TEXT,
  institution TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create conferences table
CREATE TABLE conferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conference_name TEXT NOT NULL,
  conference_date DATE NOT NULL,
  location TEXT,
  role TEXT NOT NULL, -- 'panelist', 'keynote', 'presenter', 'attendee'
  paper_title TEXT,
  presentation_link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create academic_profiles table
CREATE TABLE academic_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name TEXT NOT NULL UNIQUE, -- 'google_scholar', 'researchgate', 'orcid', 'scopus', 'linkedin', 'ad_scientific_index'
  profile_url TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT, -- 'general', 'consultancy', 'student'
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create news_and_media table
CREATE TABLE news_and_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  type TEXT NOT NULL, -- 'news', 'press', 'event', 'talk'
  publication_date DATE NOT NULL,
  external_link TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE research_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE supervisees ENABLE ROW LEVEL SECURITY;
ALTER TABLE conferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_and_media ENABLE ROW LEVEL SECURITY;

-- RLS Policies for new tables
CREATE POLICY "Public can view research_projects" ON research_projects FOR SELECT USING (true);
CREATE POLICY "Admin can manage research_projects" ON research_projects FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admin can update research_projects" ON research_projects FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

CREATE POLICY "Public can view research_grants" ON research_grants FOR SELECT USING (true);
CREATE POLICY "Admin can manage research_grants" ON research_grants FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admin can update research_grants" ON research_grants FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

CREATE POLICY "Public can view student_resources" ON student_resources FOR SELECT USING (is_public = true);
CREATE POLICY "Admin can manage student_resources" ON student_resources FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admin can update student_resources" ON student_resources FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

CREATE POLICY "Anyone can submit assignments" ON student_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view submissions" ON student_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

CREATE POLICY "Public can view supervisees" ON supervisees FOR SELECT USING (true);
CREATE POLICY "Admin can manage supervisees" ON supervisees FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admin can update supervisees" ON supervisees FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

CREATE POLICY "Public can view conferences" ON conferences FOR SELECT USING (true);
CREATE POLICY "Admin can manage conferences" ON conferences FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admin can update conferences" ON conferences FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

CREATE POLICY "Public can view academic_profiles" ON academic_profiles FOR SELECT USING (true);
CREATE POLICY "Admin can manage academic_profiles" ON academic_profiles FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admin can update academic_profiles" ON academic_profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

CREATE POLICY "Anyone can send contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view contact_messages" ON contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);

CREATE POLICY "Public can view news_and_media" ON news_and_media FOR SELECT USING (true);
CREATE POLICY "Admin can manage news_and_media" ON news_and_media FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
CREATE POLICY "Admin can update news_and_media" ON news_and_media FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
