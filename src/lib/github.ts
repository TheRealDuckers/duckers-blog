const REPO_OWNER = "TheRealDuckers";
const REPO_NAME = "blog.duckers.dev";

export interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  labels: { name: string; color: string }[];
  user: { login: string; avatar_url: string };
}

export async function fetchIssues(): Promise<GitHubIssue[]> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&sort=created&direction=desc&per_page=50`
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchIssue(number: number): Promise<GitHubIssue> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues/${number}`
  );
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export function getSlug(issue: GitHubIssue): string {
  return `${issue.number}-${issue.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function getExcerpt(body: string, maxLength = 160): string {
  const plain = body.replace(/[#*`>\[\]()!_~]/g, "").replace(/\n+/g, " ").trim();
  return plain.length > maxLength ? plain.slice(0, maxLength) + "…" : plain;
}

export { REPO_OWNER, REPO_NAME };
