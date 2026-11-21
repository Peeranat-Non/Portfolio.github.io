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
      new Navbar(nav, "P.A."),
      new AboutSection(profile),
      new ProjectGallery(github, `https://github.com/${githubConfig.username}`),
      new ActivitySection(activities),
      new EducationSection(education),
      new CertificateSection(certificates),
      new ContactSection(profile),
      new ScrollProgress(), new Parallax(), new MagneticButtons(), new CountUp(),
    ];
  }
  start() {
    this.components.forEach(c => c.mount());
    this.reveal.scan();
    document.addEventListener("rendered", () => this.reveal.scan());
  }
}
