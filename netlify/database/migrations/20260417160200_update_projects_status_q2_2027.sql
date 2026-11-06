UPDATE projects
SET
  status_it = 'In sviluppo RTB atteso Q2 2027',
  status_en = 'In progress expected RTB Q2 2027',
  updated_at = NOW()
WHERE status_it = 'In sviluppo Q4 2026';
