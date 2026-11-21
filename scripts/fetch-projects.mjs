// Runs in GitHub Actions: snapshots public repos into assets/data/projects.json
import { writeFileSync, mkdirSync } from "node:fs";

const user = process.env.GH_USER || "Peeranat-Non";
const headers = {
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
};
const get = async url => {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
};

const repos = (await get(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`))
  .filter(r => !r.fork && !r.archived);

const projects = [];
for (const r of repos) {
  const langs = Object.keys(await get(r.languages_url).catch(() => ({})));
  projects.push({
    name: r.name,
    description: r.description,
    language: r.language,
    tools: [...new Set([...langs.filter(l => l !== r.language), ...(r.topics || [])])].slice(0, 8),
    url: r.html_url,
    homepage: r.homepage,
    stars: r.stargazers_count,
    updated: r.pushed_at,
    image: `https://opengraph.githubassets.com/1/${r.full_name}`,
  });
}

mkdirSync("assets/data", { recursive: true });
writeFileSync("assets/data/projects.json", JSON.stringify(projects, null, 2));
console.log(`Saved ${projects.length} projects`);
