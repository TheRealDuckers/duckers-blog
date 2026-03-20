// @ts-ignore
import postsData from "@/data/posts.json";

export const REPO_OWNER = "TheRealDuckers";
export const REPO_NAME = "blog.duckers.dev";

export interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  labels: { name: string; color: string }[];
  user: { login: string; avatar_url: string };
}

const posts: GitHubIssue[] = postsData as GitHubIssue[];

export function getAllPosts(): GitHubIssue[] {
  return posts;
}

export function getPostByNumber(num: number): GitHubIssue | undefined {
  return posts.find((p) => p.number === num);
}

export function getSlug(issue: GitHubIssue): string {
  return `${issue.number}-${issue.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

export function getExcerpt(body: string, maxLength = 160): string {
  const plain = body.replace(/[#*`>\[\]()!_~]/g, "").replace(/\n+/g, " ").trim();
  return plain.length > maxLength ? plain.slice(0, maxLength) + "…" : plain;
}
