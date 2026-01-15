-- Database Performance Indexes
-- Run this script to add indexes for better query performance

-- Contact Messages Indexes
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(read, created_at DESC) WHERE read IS NOT NULL;

-- Consultancy Leads Indexes
CREATE INDEX IF NOT EXISTS idx_consultancy_leads_created_at ON consultancy_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultancy_leads_read ON consultancy_leads(read, created_at DESC);

-- Profiles Indexes (for faster admin checks)
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin) WHERE is_admin = true;
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- Publications Indexes
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(publication_year DESC);
CREATE INDEX IF NOT EXISTS idx_publications_type ON publications(publication_type);
CREATE INDEX IF NOT EXISTS idx_publications_created_at ON publications(created_at DESC);

-- Courses Indexes
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);

-- Research Projects Indexes
CREATE INDEX IF NOT EXISTS idx_research_projects_status ON research_projects(status);
CREATE INDEX IF NOT EXISTS idx_research_projects_start_date ON research_projects(start_date DESC);

-- Supervisees Indexes
CREATE INDEX IF NOT EXISTS idx_supervisees_status ON supervisees(status);
CREATE INDEX IF NOT EXISTS idx_supervisees_level ON supervisees(level);

-- Conferences Indexes
CREATE INDEX IF NOT EXISTS idx_conferences_date ON conferences(conference_date DESC);

-- News and Media Indexes
CREATE INDEX IF NOT EXISTS idx_news_media_date ON news_and_media(publication_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_media_featured ON news_and_media(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_news_media_type ON news_and_media(type);
