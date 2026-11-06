import "server-only";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import publishedReviews from "@/content/published-reviews.json";
import type { Story } from "@/content/stories";
import { readGitHubFile, writeGitHubFile, type GitHubTarget } from "./github-file";

// Where posted reviews are stored. To move to a database later, change only this file.
//   - With GITHUB_TOKEN and GITHUB_REPO set: saved to the repo, which rebuilds the site.
//   - In local development without them: saved straight to the file on your computer.

const FILE = "content/published-reviews.json";
const localFile = () => path.join(process.cwd(), FILE);
const isDev = process.env.NODE_ENV === "development";

function githubTarget(): GitHubTarget | null {
  const { GITHUB_TOKEN: token, GITHUB_REPO: repo, GITHUB_BRANCH: branch } = process.env;
  return token && repo ? { token, repo, branch: branch || "main", path: FILE } : null;
}

const serialize = (reviews: Story[]) => `${JSON.stringify(reviews, null, 2)}\n`;

export async function getReviews(): Promise<Story[]> {
  const target = githubTarget();
  if (target) return JSON.parse((await readGitHubFile(target)).text);
  if (isDev) return JSON.parse(await readFile(localFile(), "utf8"));
  return publishedReviews as Story[];
}

/** Applies a change to the latest saved list. Returns the new list and a note for the admin. */
export async function updateReviews(
  change: (reviews: Story[]) => Story[],
  commitMessage: string,
): Promise<{ reviews: Story[]; note: string }> {
  const target = githubTarget();
  if (target) {
    const { text, sha } = await readGitHubFile(target);
    const reviews = change(JSON.parse(text));
    await writeGitHubFile(target, serialize(reviews), sha, commitMessage);
    return { reviews, note: "The site is rebuilding now. The change should be live in a few minutes." };
  }
  if (isDev) {
    const reviews = change(JSON.parse(await readFile(localFile(), "utf8")));
    await writeFile(localFile(), serialize(reviews));
    return { reviews, note: "Saved to your local copy of the site." };
  }
  throw new Error("Saving isn't connected yet. Add GITHUB_TOKEN and GITHUB_REPO in your host's settings, as described in SETUP.md.");
}
