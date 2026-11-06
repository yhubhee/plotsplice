// Reads and writes one file in a GitHub repo through GitHub's API. Saving a file makes a
// commit, and that commit is what tells Vercel or Netlify to rebuild the site.

export type GitHubTarget = { token: string; repo: string; branch: string; path: string };

function explain(status: number): string {
  if (status === 401 || status === 403) return "GitHub rejected the access key. Check GITHUB_TOKEN in your host's settings.";
  if (status === 404) return "GitHub couldn't find the repo or file. Check GITHUB_REPO and GITHUB_BRANCH, and that the site has been pushed.";
  if (status === 409 || status === 422) return "The file changed while you were saving. Reload this page and try again.";
  return `GitHub returned an unexpected error (${status}). Try again in a minute.`;
}

const headers = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "plotsplice-site",
});

const contentsUrl = ({ repo, path }: GitHubTarget) => `https://api.github.com/repos/${repo}/contents/${path}`;

export async function readGitHubFile(target: GitHubTarget): Promise<{ text: string; sha: string }> {
  const response = await fetch(`${contentsUrl(target)}?ref=${encodeURIComponent(target.branch)}`, {
    headers: headers(target.token),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(explain(response.status));
  const file = (await response.json()) as { content: string; sha: string };
  return { text: Buffer.from(file.content, "base64").toString("utf8"), sha: file.sha };
}

export async function writeGitHubFile(target: GitHubTarget, text: string, sha: string, message: string): Promise<void> {
  const response = await fetch(contentsUrl(target), {
    method: "PUT",
    headers: { ...headers(target.token), "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      message,
      content: Buffer.from(text, "utf8").toString("base64"),
      sha, // GitHub refuses the save if the file changed since we read it.
      branch: target.branch,
    }),
  });
  if (!response.ok) throw new Error(explain(response.status));
}
