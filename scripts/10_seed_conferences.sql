-- Clear existing sample conferences
DELETE FROM conferences;

-- Insert real conferences data
INSERT INTO conferences (conference_name, conference_date, location, role, paper_title) VALUES
('19th International Conference of the Society for Peace Studies and Practice (SPSP)', '2025-11-23', 'University of Ibadan', 'Participant', 'Annual Conference Participation'),
('6th North Central Zonal Conference of the Nigerian Political Science Association (NPSA)', '2025-10-25', 'Nasarawa State University, Keffi', 'Participant', 'Zonal Conference Participation'),
('Workshop on Gender-Based Violence in Emergencies (ToT)', '2025-04-28', 'Benue State University', 'Participant', 'Training of Trainers Workshop'),
('Regional Workshop on Addressing Challenges of Communal Conflicts, Banditry, and Criminality in North Central Nigeria', '2024-07-18', 'Benue State University, Makurdi', 'Participant', 'Multi-Stakeholder Consensus and Approaches among Peacebuilders'),
('4th Virtual Workshop of the Doctoral Academy of Nigeria (DAN)', '2024-06-04', 'Virtual', 'Participant', 'Organized by Committee of Provosts and Deans of Postgraduate Colleges'),
('The Concord Initiative North Central Zonal Workshop', '2024-03-26', 'Benue Hotels, Makurdi', 'Participant', 'Organized by OSPRE, EU and Ziz');
