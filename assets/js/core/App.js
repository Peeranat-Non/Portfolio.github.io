import { profile, nav, activities, education, certificates, githubConfig, fallbackProjects } from "../data/content.js";
import { GitHubService } from "../services/GitHubService.js";
import { Navbar } from "../components/Navbar.js";
import { ProjectGallery } from "../components/ProjectGallery.js";
import { AboutSection, ActivitySection, EducationSection, CertificateSection, ContactSection } from "../components/Section.js";
import { ScrollProgress, Parallax, MagneticButtons, CountUp } from "../components/Effects.js";
import { RevealObserver } from "../components/RevealObserver.js";

/** Composition root: builds components from data and wires them together. */
export class App {
  constructor() {
    const github = new GitHubService(githubConfig.username, { ...githubConfig, fallback: fallbackProjects });
    this.reveal = new RevealObserver();
    this.components = [
      new Navbar(nav.filter(n => n.id !== "certificates" || certificates.length), "P.A."),
      new AboutSection(profile),
      new ProjectGallery(github, `https://github.com/${githubConfig.username}`, githubConfig.images),
      new ActivitySection(activities),
      new EducationSection(education),
      new CertificateSection(certificates),
      new ContactSection(profile),
      new ScrollProgress(), new Parallax(), new MagneticButtons(), new CountUp(),
    ];
  }
  start() {
    // one failing section must never blank the whole page
    this.components.forEach(c => { try { c.mount(); } catch (e) { console.error(e); } });
    this.reveal.scan();
    document.addEventListener("rendered", () => this.reveal.scan());
  }
}
