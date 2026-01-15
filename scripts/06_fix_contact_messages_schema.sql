-- Add missing contact_messages table schema (if needed)
-- NOTE: This table already exists in 02_add_missing_tables.sql at lines 97-107
-- but with different column names than what the API expects.
-- Run this ONLY if you need to align the schema with the API expectations.

-- If you already ran 02_add_missing_tables.sql, run these ALTER commands:
ALTER TABLE contact_messages RENAME COLUMN sender_name TO name;
ALTER TABLE contact_messages RENAME COLUMN sender_email TO email;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS ip_address TEXT;

-- Or, if the table doesn't exist yet, create it with the correct schema:
/*
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message_type TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can send contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view contact_messages" ON contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true)
);
*/
