import { Project } from "../models/Project.js";

/** Talks to the GitHub REST API; caches result for 1 hour to avoid rate limits. */
export class GitHubService {
  constructor(username, { exclude = [], featured = [], include = [], overrides = {}, fallback = [] } = {}) {
    this.username = username;
    this.exclude = exclude;
    this.include = include;
    this.overrides = overrides;
    this.featured = featured;
    this.cacheKey = `gh:${username}`;
    this.fallback = fallback.filter(o => this.#allowed(o.name)).map(o => this.#override(new Project(o)));
  }

  /** Order: synced snapshot (projects.json) -> live GitHub API -> built-in fallback. */
  async fetchProjects() {
    for (const source of [() => this.#fetchSnapshot(), () => this.#fetchLive()]) {
      try {
        const list = await source();
        if (list.length) return list.map(p => this.#override(p));
      } catch (e) { console.warn(e); }
    }
    return this.fallback;
  }

  /** File written by the GitHub Action (scripts/fetch-projects.mjs). */
  async #fetchSnapshot() {
    const res = await fetch("assets/data/projects.json", { cache: "no-cache" });
    if (!res.ok) throw new Error(`snapshot ${res.status}`);
    return (await res.json())
      .filter(o => this.#allowed(o.name))
      .map(o => new Project(o))
      .sort((a, b) => this.#rank(a) - this.#rank(b));
  }

  async #fetchLive() {
    const cached = this.#readCache();
    if (cached) return cached;
    const res = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=100&sort=pushed`);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos = await res.json();
    const projects = repos
      .filter(r => !r.fork && this.#allowed(r.name) && r.name.toLowerCase() !== `${this.username.toLowerCase()}.github.io`)
      .map(Project.fromApi)
      .sort((a, b) => this.#rank(a) - this.#rank(b));
    this.#writeCache(projects);
    return projects;
  }

  /** Manual edits from content.js (language, tools, description, displayName, image, homepage). */
  #override(p) {
    return Object.assign(p, this.overrides[p.name] || {});
  }

  /** include[] = whitelist (empty = show all); exclude[] = always hide. */
  #allowed(name) {
    return !this.exclude.includes(name) && (!this.include.length || this.include.includes(name));
  }
  #rank(p) {
    const i = (this.include.length ? this.include : this.featured).indexOf(p.name);
    return i === -1 ? 999 : i;
  }
  #readCache() {
    try {
      const { t, d } = JSON.parse(sessionStorage.getItem(this.cacheKey) || "null") || {};
      return t && Date.now() - t < 6e5 ? d.map(o => new Project(o)) : null;
    } catch { return null; }
  }
  #writeCache(list) {
    try { sessionStorage.setItem(this.cacheKey, JSON.stringify({ t: Date.now(), d: list })); } catch {}
  }
}
