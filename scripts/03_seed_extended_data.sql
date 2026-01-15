-- Seed research projects
INSERT INTO research_projects (title, abstract, status, start_date, end_date, research_areas, image_url) VALUES
('Digital Transformation in African Organizations', 'Exploring the impact and strategies of digital transformation in emerging African economies', 'ongoing', '2023-01-15', NULL, ARRAY['digital transformation', 'organizational change', 'african economies'], '/placeholder.svg?height=300&width=400'),
('Governance and Institutional Development', 'Research on institutional frameworks and governance structures in developing nations', 'ongoing', '2022-06-01', NULL, ARRAY['governance', 'institutional development', 'policy'], '/placeholder.svg?height=300&width=400'),
('Innovation Management in Resource-Constrained Environments', 'Studying innovation adoption and management practices in organizations with limited resources', 'completed', '2020-01-01', '2023-12-31', ARRAY['innovation', 'management', 'resource constraints'], '/placeholder.svg?height=300&width=400');

-- Seed research grants
INSERT INTO research_grants (title, funding_agency, amount, year, status, description) VALUES
('Digital Transformation and Organizational Change', 'African Development Bank', 150000, 2023, 'awarded', 'Multi-year research grant for studying digital transformation impacts'),
('Governance Frameworks for Development', 'World Bank', 200000, 2022, 'awarded', 'Research on governance and institutional development'),
('Innovation Ecosystems in Africa', 'German Academic Exchange Service', 75000, 2024, 'pending', 'Grant pending approval for innovation research'),
('Strategic Management in Crisis', 'Nigerian Research Council', 50000, 2023, 'completed', 'Completed research on strategic management during crises');

-- Seed supervisees
INSERT INTO supervisees (student_name, project_title, level, start_year, status, research_area, institution) VALUES
('Chioma Okafor', 'Digital Transformation Strategy in Nigerian Banks', 'postgraduate', 2023, 'ongoing', 'digital transformation', 'Federal University of Makurdi'),
('Adeyemi Adebayo', 'Innovation Management Practices in SMEs', 'phd', 2022, 'ongoing', 'innovation management', 'Federal University of Makurdi'),
('Zainab Hassan', 'Organizational Culture and Performance', 'postgraduate', 2024, 'ongoing', 'organizational development', 'Federal University of Makurdi'),
('Emeka Nwankwo', 'Leadership Effectiveness in Government Agencies', 'phd', 2021, 'completed', 'leadership', 'Federal University of Makurdi'),
('Fatima Mohammed', 'Change Management in Higher Education', 'postgraduate', 2023, 'ongoing', 'change management', 'Federal University of Makurdi');

-- Seed conferences
INSERT INTO conferences (conference_name, conference_date, location, role, paper_title) VALUES
('International Management Conference 2024', '2024-06-15', 'Lagos, Nigeria', 'keynote', 'Digital Transformation: Opportunities and Challenges in Africa'),
('African Development Forum 2023', '2023-09-20', 'Accra, Ghana', 'panelist', 'Governance and Economic Growth'),
('Innovation Summit Africa 2024', '2024-04-10', 'Nairobi, Kenya', 'presenter', 'Building Innovation Ecosystems in Emerging Markets'),
('Annual Conference on Business Studies', '2023-11-08', 'Abuja, Nigeria', 'presenter', 'Strategic Change Management in Organizations');

-- Seed academic profiles
INSERT INTO academic_profiles (platform_name, profile_url, is_verified) VALUES
('google_scholar', 'https://scholar.google.com/citations?user=JohnTorTsuwa', true),
('researchgate', 'https://www.researchgate.net/profile/John-Tor-Tsuwa', true),
('orcid', 'https://orcid.org/0000-0001-2345-6789', true),
('scopus', 'https://www.scopus.com/authid/detail.uri?authorId=9999999999', true),
('linkedin', 'https://linkedin.com/in/johntortsuwa', true),
('ad_scientific_index', 'https://www.ads.org.tr/en/profile/john-tor-tsuwa', false)
ON CONFLICT (platform_name) DO NOTHING;

-- Seed news and media items
INSERT INTO news_and_media (title, description, type, publication_date, external_link, featured) VALUES
('New Research Grant Awarded', 'Prof. Tsuwa receives major grant for digital transformation research', 'news', '2024-01-15', null, true),
('Featured in African Business Magazine', 'Interview with Prof. Tsuwa on organizational change', 'press', '2024-01-10', 'https://africanbiznow.com', false),
('Keynote Speaker at Lagos Management Summit', 'Prof. Tsuwa to deliver keynote on innovation', 'event', '2024-02-20', null, true),
('Research Findings Published in Top Journal', 'Latest publication on governance received international attention', 'news', '2024-01-08', null, false);
