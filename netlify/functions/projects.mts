import type { Config, Context } from "@netlify/functions";
import { getDatabase } from "@netlify/database";
import { getStore } from "@netlify/blobs";
import { INITIAL_PROJECTS, type ProjectItem } from "./_seed.mts";

const BLOB_STORE = "eec-projects-store";
const BLOB_KEY = "projects-list";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function isAuthorized(req: Request): boolean {
  const adminPassword = Netlify.env.get("ADMIN_PASSWORD") || "eec-admin";
  const provided = req.headers.get("x-admin-password") || "";
  return provided === adminPassword;
}

function normalizeRow(row: Record<string, unknown>, idx = 0): ProjectItem {
  return {
    id: Number(row.id ?? idx + 1),
    position: Number(row.position ?? idx + 1),
    name: String(row.name ?? "").trim(),
    dc_mwp: Number(row.dc_mwp ?? 0),
    ac_mwp: Number(row.ac_mwp ?? 0),
    bess: Number(row.bess ?? 0),
    region_it: String(row.region_it ?? "Sicilia").trim(),
    region_en: String(row.region_en ?? (row.region_it === "Sardegna" ? "Sardinia" : "Sicily")).trim(),
    status_type: row.status_type === "rtb" ? "rtb" : "prog",
    status_it: String(row.status_it ?? (row.status_type === "rtb" ? "RTB" : "In sviluppo Q4 2026")).trim(),
    status_en: String(row.status_en ?? (row.status_type === "rtb" ? "RTB" : "In progress Q4 2026")).trim(),
  };
}

function hasDatabaseConfigured(): boolean {
  return Boolean(Netlify.env.get("NETLIFY_DB_URL") || Netlify.env.get("NETLIFY_DATABASE_URL"));
}

async function loadBlobProjects(): Promise<ProjectItem[]> {
  const store = getStore({ name: BLOB_STORE, consistency: "strong" });
  const existing = await store.get(BLOB_KEY, { type: "json" });
  if (Array.isArray(existing) && existing.length > 0) {
    return existing.map((r, i) => normalizeRow(r as Record<string, unknown>, i));
  }
  await store.setJSON(BLOB_KEY, INITIAL_PROJECTS);
  return [...INITIAL_PROJECTS];
}

async function saveBlobProjects(items: ProjectItem[]): Promise<void> {
  const store = getStore({ name: BLOB_STORE, consistency: "strong" });
  await store.setJSON(BLOB_KEY, items);
}

export default async (req: Request, _context: Context) => {
  const url = new URL(req.url);
  const method = req.method.toUpperCase();

  if (method === "GET" && url.searchParams.has("verify")) {
    return isAuthorized(req)
      ? jsonResponse({ ok: true })
      : jsonResponse({ error: "Password non valida" }, 401);
  }

  const usePostgres = hasDatabaseConfigured();

  try {
    if (method === "GET") {
      if (usePostgres) {
        const db = getDatabase();
        const rows = await db.sql<Record<string, unknown>>`
          SELECT id, position, name, dc_mwp, ac_mwp, bess, region_it, region_en, status_type, status_it, status_en
          FROM projects
          ORDER BY position ASC, id ASC
        `;
        return jsonResponse({
          storage: "netlify-database",
          projects: rows.map((r, i) => normalizeRow(r, i)),
        });
      } else {
        const projects = await loadBlobProjects();
        projects.sort((a, b) => a.position - b.position || a.id - b.id);
        return jsonResponse({
          storage: "netlify-blobs",
          projects,
        });
      }
    }

    if (!isAuthorized(req)) {
      return jsonResponse({ error: "Non autorizzato: password amministratore errata o mancante." }, 401);
    }

    if (method === "POST") {
      const payload = (await req.json()) as Record<string, unknown>;
      if (!payload.name || String(payload.name).trim() === "") {
        return jsonResponse({ error: "Il nome del progetto è obbligatorio." }, 400);
      }

      if (usePostgres) {
        const db = getDatabase();
        const item = normalizeRow(payload);
        const inserted = await db.sql<Record<string, unknown>>`
          INSERT INTO projects (position, name, dc_mwp, ac_mwp, bess, region_it, region_en, status_type, status_it, status_en)
          VALUES (
            ${item.position},
            ${item.name},
            ${item.dc_mwp},
            ${item.ac_mwp},
            ${item.bess},
            ${item.region_it},
            ${item.region_en},
            ${item.status_type},
            ${item.status_it},
            ${item.status_en}
          )
          RETURNING id, position, name, dc_mwp, ac_mwp, bess, region_it, region_en, status_type, status_it, status_en
        `;
        return jsonResponse(normalizeRow(inserted[0]), 201);
      } else {
        const projects = await loadBlobProjects();
        const nextId = projects.reduce((max, p) => Math.max(max, p.id), 0) + 1;
        const nextPos = payload.position ? Number(payload.position) : projects.length + 1;
        const created = normalizeRow({ ...payload, id: nextId, position: nextPos });
        projects.push(created);
        projects.sort((a, b) => a.position - b.position || a.id - b.id);
        await saveBlobProjects(projects);
        return jsonResponse(created, 201);
      }
    }

    if (method === "PUT") {
      const id = Number(url.searchParams.get("id"));
      if (!id) {
        return jsonResponse({ error: "Parametro id mancante." }, 400);
      }
      const payload = (await req.json()) as Record<string, unknown>;
      const item = normalizeRow({ ...payload, id });

      if (usePostgres) {
        const db = getDatabase();
        const updated = await db.sql<Record<string, unknown>>`
          UPDATE projects
          SET
            position = ${item.position},
            name = ${item.name},
            dc_mwp = ${item.dc_mwp},
            ac_mwp = ${item.ac_mwp},
            bess = ${item.bess},
            region_it = ${item.region_it},
            region_en = ${item.region_en},
            status_type = ${item.status_type},
            status_it = ${item.status_it},
            status_en = ${item.status_en},
            updated_at = NOW()
          WHERE id = ${id}
          RETURNING id, position, name, dc_mwp, ac_mwp, bess, region_it, region_en, status_type, status_it, status_en
        `;
        if (updated.length === 0) {
          return jsonResponse({ error: "Progetto non trovato." }, 404);
        }
        return jsonResponse(normalizeRow(updated[0]));
      } else {
        const projects = await loadBlobProjects();
        const idx = projects.findIndex((p) => p.id === id);
        if (idx === -1) {
          return jsonResponse({ error: "Progetto non trovato." }, 404);
        }
        projects[idx] = item;
        projects.sort((a, b) => a.position - b.position || a.id - b.id);
        await saveBlobProjects(projects);
        return jsonResponse(item);
      }
    }

    if (method === "DELETE") {
      const id = Number(url.searchParams.get("id"));
      if (!id) {
        return jsonResponse({ error: "Parametro id mancante." }, 400);
      }

      if (usePostgres) {
        const db = getDatabase();
        const deleted = await db.sql<Record<string, unknown>>`
          DELETE FROM projects WHERE id = ${id} RETURNING id
        `;
        if (deleted.length === 0) {
          return jsonResponse({ error: "Progetto non trovato." }, 404);
        }
        return jsonResponse({ ok: true, id });
      } else {
        const projects = await loadBlobProjects();
        const idx = projects.findIndex((p) => p.id === id);
        if (idx === -1) {
          return jsonResponse({ error: "Progetto non trovato." }, 404);
        }
        projects.splice(idx, 1);
        await saveBlobProjects(projects);
        return jsonResponse({ ok: true, id });
      }
    }

    return jsonResponse({ error: "Metodo non consentito." }, 405);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return jsonResponse({ error: message }, 500);
  }
};

export const config: Config = {
  path: "/api/projects",
};
