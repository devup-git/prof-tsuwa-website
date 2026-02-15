-- Note: This script should be run manually after creating your admin account
-- The admin user should be created through Supabase Auth dashboard

-- 1. If you just created the user and they don't have a profile yet, run this:
-- INSERT INTO profiles (id, email, is_admin) VALUES ('YOUR_ADMIN_UUID', 'your-email@example.com', true);

-- 2. If they already have a profile but need admin rights, run this:
-- UPDATE profiles SET is_admin = true WHERE id = 'YOUR_ADMIN_UUID';
