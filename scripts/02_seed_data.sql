-- Insert sample publications
INSERT INTO publications (title, authors, abstract, publication_year, journal_name, publication_type, doi) VALUES
('Emerging Trends in Digital Transformation', ARRAY['John Tor Tsuwa', 'Jane Smith'], 'This study examines the latest trends in digital transformation across African enterprises...', 2023, 'International Journal of Business Studies', 'journal', '10.1234/ijbs.2023.001'),
('Agricultural Technology Adoption in Nigeria', ARRAY['John Tor Tsuwa', 'Ahmed Hassan', 'Peace Okafor'], 'An empirical analysis of technology adoption rates among smallholder farmers...', 2022, 'African Development Review', 'journal', '10.5678/adr.2022.045'),
('Innovation Management in Resource-Constrained Environments', ARRAY['John Tor Tsuwa'], 'A framework for managing innovation in organizations with limited resources...', 2023, 'Proceedings of the International Conference on Innovation and Entrepreneurship', 'conference', NULL);

-- Insert sample courses
INSERT INTO courses (code, title, description, semester, year, level, credits) VALUES
('BUS 501', 'Strategic Management', 'Advanced study of strategic planning and organizational strategy', '1', 2024, 'postgraduate', 3),
('BUS 502', 'Organizational Behavior', 'Comprehensive examination of organizational dynamics and behavior', '1', 2024, 'postgraduate', 3),
('BUS 301', 'Business Policy', 'Integration of functional business areas through case study analysis', '2', 2024, 'undergraduate', 3),
('ENT 401', 'Entrepreneurship and Innovation', 'Developing entrepreneurial mindset and innovation capabilities', '1', 2024, 'undergraduate', 3)
ON CONFLICT (code) DO NOTHING;

-- Insert sample consultancy services
INSERT INTO consultancy_services (title, description, icon_name, order_index) VALUES
('Strategic Planning', 'Develop comprehensive strategies for organizational growth and competitive advantage', 'target', 1),
('Digital Transformation', 'Guide organizations through digital modernization and technology adoption', 'zap', 2),
('Organizational Development', 'Build high-performing teams and optimize organizational structures', 'users', 3),
('Innovation Management', 'Foster innovation culture and develop innovation capabilities', 'lightbulb', 4),
('Change Management', 'Navigate organizational change effectively and build change capability', 'trending-up', 5);

-- Insert sample case studies
INSERT INTO consultancy_case_studies (title, description, client_industry, results) VALUES
('Digital Transformation in Banking Sector', 'Helped a leading bank modernize its operations and customer experience', 'Financial Services', 'Increased efficiency by 40%, improved customer satisfaction by 35%'),
('Agricultural Supply Chain Optimization', 'Redesigned supply chain for a major agricultural company', 'Agriculture', 'Reduced costs by 25%, improved delivery time by 50%'),
('Manufacturing Excellence Program', 'Implemented lean manufacturing and continuous improvement', 'Manufacturing', 'Increased productivity by 45%, reduced waste by 30%');
