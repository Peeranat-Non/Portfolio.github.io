import * as content from "../data/content.js";
import { GitHubService } from "../services/GitHubService.js";
import { Navbar } from "../components/Navbar.js";
import { ProjectGallery } from "../components/ProjectGallery.js";
import { AboutSection, ActivitySection, EducationSection, CertificateSection, ContactSection } from "../components/Section.js";
import { ScrollProgress, Parallax, MagneticButtons, CountUp } from "../components/Effects.js";
import { RevealObserver } from "../components/RevealObserver.js";
const { profile, nav, activities, education, certificates, githubConfig, fallbackProjects } = content;

/** Sections whose list can be empty (they hide themselves automatically when it is). */
const LISTS = { works: activities, education, certificates };

/** Composition root: builds components from data and wires them together. */
export class App {
  constructor() {
    // Hidden = hiddenSections[] in content.js  +  any section whose list is empty
    this.hidden = new Set([
      ...(content.hiddenSections ?? []),
      ...Object.entries(LISTS).filter(([, list]) => !list?.length).map(([id]) => id),
    ]);
    const github = new GitHubService(githubConfig.username, { ...githubConfig, fallback: fallbackProjects });
    this.reveal = new RevealObserver();
    this.components = [
      new Navbar(nav.filter(n => !this.hidden.has(n.id)), "P.A."),
      new AboutSection(profile),
      ...(this.hidden.has("projects") ? [] : [new ProjectGallery(github, `https://github.com/${githubConfig.username}`, githubConfig.images)]),
      new ActivitySection(activities ?? []),
      new EducationSection(education ?? []),
      new CertificateSection(certificates ?? []),
      new ContactSection(profile),
      new ScrollProgress(), new Parallax(), new MagneticButtons(), new CountUp(),
    ];
  }
  start() {
    // one failing section must never blank the whole page
    this.components.forEach(c => { try { c.mount(); } catch (e) { console.error(e); } });
    this.hidden.forEach(id => document.getElementById(id)?.remove());
    this.reveal.scan();
    document.addEventListener("rendered", () => this.reveal.scan());
  }
}
