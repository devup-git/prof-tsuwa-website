-- Seed virtual class links for student resources
INSERT INTO student_resources (title, description, category, course_code, virtual_class_link, link_type, is_public) VALUES
('POL 501 - Monday Session', 'Virtual class session for Advanced Peace and Conflict Studies', 'virtual_class', 'POL 501', 'https://zoom.us/j/91234567890?pwd=ABC123', 'zoom', TRUE),
('POL 501 - Thursday Session', 'Weekly review and Q&A session', 'virtual_class', 'POL 501', 'https://meet.google.com/abc-defg-hijk', 'google_meet', TRUE),
('POL 502 - Lecture Hall', 'Main lecture session for Governance and Democracy', 'virtual_class', 'POL 502', 'https://zoom.us/j/98765432100?pwd=XYZ789', 'zoom', TRUE),
('POL 302 - Research Seminar', 'Weekly seminar for African Politics students', 'virtual_class', 'POL 302', 'https://meet.google.com/xyz-uvwx-yz12', 'google_meet', TRUE);
