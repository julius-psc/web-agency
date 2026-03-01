-- Seed data from hot_leads.csv
-- Run this in Supabase SQL Editor AFTER running supabase-schema.sql

INSERT INTO leads (business_name, phone_number, address, niche, contacted) VALUE
  ('Gedibat et fils', '06 88 48 94 81', '4 Av. de Bruxelles, 14000 Caen, France', 'Maçonnerie générale', false),
  ('JS Maçonnerie Générale', '07 83 26 22 08', '3 Rue des Treize Acres, 14000 Caen, France', 'Maçonnerie générale', false),
  ('Élagueurs normands : élagage, abattage, grimpeur', '07 59 62 88 88', '87 Rue de Lirose, 14940 Sannerville, France', 'Élagage et abattage', false),
  ('Caen Travaux', '02 61 53 71 50', '17 Rue des Frères Lumière, 14120 Mondeville, France', 'Nettoyage fin de chantier', false)
ON CONFLICT (phone_number) DO NOTHING;
