/**
 * Refresh the baked-in static data from the database.
 *
 * Usage (PowerShell):
 *   $env:DATABASE_URL="postgresql://..."; node scripts/refresh-data.mjs
 *
 * This fetches every public table, normalises column names to camelCase,
 * sorts them the same way the old API did, and writes
 * client/src/data/portfolio-data.ts which the static site reads from.
 *
 * The DATABASE_URL is read from the environment so credentials are never
 * committed to the repo.
 */
import pg from "pg";
import { writeFileSync, mkdirSync } from "fs";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("✗ Set DATABASE_URL before running. Example:");
  console.error('  $env:DATABASE_URL="postgresql://..."; node scripts/refresh-data.mjs');
  process.exit(1);
}

const pool = new pg.Pool({ connectionString, ssl: { rejectUnauthorized: false } });

const tables = [
  "projects",
  "certificates",
  "skills",
  "services",
  "social_links",
  "blog_posts",
  "about_content",
  "products",
];

const camel = (row) => {
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    out[k.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return out;
};

const dump = {};
for (const table of tables) {
  try {
    const order =
      table === "projects" || table === "social_links" || table === "products"
        ? ' ORDER BY "order"::int ASC NULLS LAST'
        : "";
    const { rows } = await pool.query(`SELECT * FROM ${table}${order}`);
    dump[table] = rows.map(camel);
    console.log(`✓ ${table}: ${rows.length}`);
  } catch (e) {
    dump[table] = [];
    console.log(`✗ ${table}: ${e.message}`);
  }
}
await pool.end();

const byOrder = (a, b) => parseInt(a.order || "0") - parseInt(b.order || "0");
const byCreatedDesc = (a, b) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const data = {
  projects: (dump.projects || []).slice().sort(byOrder),
  certificates: (dump.certificates || []).slice().sort(byCreatedDesc),
  skills: dump.skills || [],
  services: dump.services || [],
  socialLinks: (dump.social_links || []).slice().sort(byOrder),
  products: (dump.products || []).slice().sort(byOrder),
  blogPosts: (dump.blog_posts || [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt || b.createdAt).getTime() -
        new Date(a.publishedAt || a.createdAt).getTime()
    ),
  aboutContent: (dump.about_content || [])[0] || null,
};

const banner = `// AUTO-GENERATED from the production database. Do not edit by hand.
// Regenerate with: $env:DATABASE_URL="..."; node scripts/refresh-data.mjs
/* eslint-disable */
`;

mkdirSync("client/src/data", { recursive: true });
writeFileSync(
  "client/src/data/portfolio-data.ts",
  banner + "export const portfolioData = " + JSON.stringify(data, null, 2) + " as const;\n"
);
console.log("\n✓ Wrote client/src/data/portfolio-data.ts");
