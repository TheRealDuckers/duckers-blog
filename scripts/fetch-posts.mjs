import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const REPO_OWNER = "TheRealDuckers";
const REPO_NAME = "blog.duckers.dev";
const OUT_DIR = path.join(PROJECT_ROOT, "src", "data");

async function fetchAllIssues() {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&sort=created&direction=desc&per_page=100`
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  const issues = await res.json();

  // Filter: only TheRealDuckers, no bracket-prefixed titles
  return issues
    .filter((i) => i.user.login === REPO_OWNER && !i.title.startsWith("["))
    .map((i) => ({
      number: i.number,
      title: i.title,
      body: i.body || "",
      created_at: i.created_at,
      updated_at: i.updated_at,
      labels: (i.labels || []).map((l) => ({ name: l.name, color: l.color })),
      user: { login: i.user.login, avatar_url: i.user.avatar_url },
    }));
}

async function main() {
  console.log("Fetching issues from GitHub…");
  const issues = await fetchAllIssues();
  console.log(`Fetched ${issues.length} posts`);

  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  fs.writeFileSync(
    path.join(OUT_DIR, "posts.json"),
    JSON.stringify(issues, null, 2)
  );
  console.log("Wrote src/data/posts.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
