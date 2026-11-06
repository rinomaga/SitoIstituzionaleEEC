export interface ProjectItem {
  id: number;
  position: number;
  name: string;
  dc_mwp: number;
  ac_mwp: number;
  bess: number;
  region_it: string;
  region_en: string;
  status_type: "rtb" | "prog";
  status_it: string;
  status_en: string;
}

export const INITIAL_PROJECTS: ProjectItem[] = [
  { id: 1,  position: 1,  name: "VIZ 1", dc_mwp: 6.38, ac_mwp: 5.94, bess: 0, region_it: "Sicilia",  region_en: "Sicily",   status_type: "rtb",  status_it: "RTB",                 status_en: "RTB" },
  { id: 2,  position: 2,  name: "VIZ 2", dc_mwp: 8.52, ac_mwp: 7.92, bess: 0, region_it: "Sicilia",  region_en: "Sicily",   status_type: "rtb",  status_it: "RTB",                 status_en: "RTB" },
  { id: 3,  position: 3,  name: "SEN 1", dc_mwp: 3.56, ac_mwp: 3.30, bess: 0, region_it: "Sardegna", region_en: "Sardinia", status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 4,  position: 4,  name: "SEN 2", dc_mwp: 7.95, ac_mwp: 7.59, bess: 0, region_it: "Sardegna", region_en: "Sardinia", status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 5,  position: 5,  name: "SEN 3", dc_mwp: 3.64, ac_mwp: 3.30, bess: 0, region_it: "Sardegna", region_en: "Sardinia", status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 6,  position: 6,  name: "SEN 4", dc_mwp: 3.49, ac_mwp: 3.30, bess: 0, region_it: "Sardegna", region_en: "Sardinia", status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 7,  position: 7,  name: "SEN 5", dc_mwp: 6.34, ac_mwp: 5.94, bess: 0, region_it: "Sardegna", region_en: "Sardinia", status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 8,  position: 8,  name: "SEN 6", dc_mwp: 5.93, ac_mwp: 6.61, bess: 0, region_it: "Sardegna", region_en: "Sardinia", status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 9,  position: 9,  name: "LIC 1", dc_mwp: 9.83, ac_mwp: 9.57, bess: 0, region_it: "Sicilia",  region_en: "Sicily",   status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 10, position: 10, name: "VIZ 3", dc_mwp: 7.58, ac_mwp: 7.26, bess: 0, region_it: "Sicilia",  region_en: "Sicily",   status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 11, position: 11, name: "VIZ 4", dc_mwp: 3.68, ac_mwp: 3.30, bess: 0, region_it: "Sicilia",  region_en: "Sicily",   status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
  { id: 12, position: 12, name: "LIC 2", dc_mwp: 6.90, ac_mwp: 6.60, bess: 0, region_it: "Sicilia",  region_en: "Sicily",   status_type: "prog", status_it: "In sviluppo Q4 2026", status_en: "In progress Q4 2026" },
];
