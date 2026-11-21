/** Domain model for one GitHub repository. */
export class Project {
  constructor({ name, description, language, url, homepage, stars = 0, updated = "", image = "", tools = [] }) {
    Object.assign(this, { name, description, language, url, homepage, stars, updated, image, tools });
  }
  static fromApi(r) {
    return new Project({
      name: r.name, description: r.description, language: r.language,
      url: r.html_url, homepage: r.homepage, stars: r.stargazers_count, updated: r.pushed_at, tools: r.topics || [],
      image: `https://opengraph.githubassets.com/1/${r.full_name}`,
    });
  }
  get title() { return this.name.replace(/[-_]+/g, " "); }
  get year() { return this.updated ? new Date(this.updated).getFullYear() : ""; }
  get summary() { return this.description || "ยังไม่มีคำอธิบายโปรเจกต์"; }
}
