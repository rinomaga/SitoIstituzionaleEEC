CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  position INTEGER NOT NULL DEFAULT 1,
  name TEXT NOT NULL,
  dc_mwp NUMERIC(10, 2) NOT NULL DEFAULT 0,
  ac_mwp NUMERIC(10, 2) NOT NULL DEFAULT 0,
  bess NUMERIC(10, 2) NOT NULL DEFAULT 0,
  region_it TEXT NOT NULL,
  region_en TEXT NOT NULL,
  status_type TEXT NOT NULL DEFAULT 'prog',
  status_it TEXT NOT NULL,
  status_en TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO projects (position, name, dc_mwp, ac_mwp, bess, region_it, region_en, status_type, status_it, status_en) VALUES
  (1,  'VIZ 1', 6.38, 5.94, 0, 'Sicilia',  'Sicily',   'rtb',  'RTB',                 'RTB'),
  (2,  'VIZ 2', 8.52, 7.92, 0, 'Sicilia',  'Sicily',   'rtb',  'RTB',                 'RTB'),
  (3,  'SEN 1', 3.56, 3.30, 0, 'Sardegna', 'Sardinia', 'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (4,  'SEN 2', 7.95, 7.59, 0, 'Sardegna', 'Sardinia', 'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (5,  'SEN 3', 3.64, 3.30, 0, 'Sardegna', 'Sardinia', 'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (6,  'SEN 4', 3.49, 3.30, 0, 'Sardegna', 'Sardinia', 'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (7,  'SEN 5', 6.34, 5.94, 0, 'Sardegna', 'Sardinia', 'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (8,  'SEN 6', 5.93, 6.61, 0, 'Sardegna', 'Sardinia', 'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (9,  'LIC 1', 9.83, 9.57, 0, 'Sicilia',  'Sicily',   'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (10, 'VIZ 3', 7.58, 7.26, 0, 'Sicilia',  'Sicily',   'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (11, 'VIZ 4', 3.68, 3.30, 0, 'Sicilia',  'Sicily',   'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026'),
  (12, 'LIC 2', 6.90, 6.60, 0, 'Sicilia',  'Sicily',   'prog', 'In sviluppo Q4 2026', 'In progress Q4 2026');

