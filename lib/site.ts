// Editable site content. Everything here was carried over from the
// previous version of the portfolio; nothing has been added.

export const SITE = {
  name: "Stephane Tchatchum Chassem",
  tagline: "Yaoundé → Kigali → Computation",
  location: "Kigali, Rwanda",
  // Kigali: 1.9441° S, 30.0619° E
  coordinates: "1.94° S, 30.06° E",
  email: "stephanetchatchum@gmail.com",
  github: {
    href: "https://github.com/stephanetchatchum",
    label: "github.com/stephanetchatchum",
  },
  linkedin: {
    href: "https://www.linkedin.com/in/stephane-tchatchum-7b4666383/",
    label: "in/stephane-tchatchum",
  },
  // The CV download route (/api/cv/download) is not implemented yet.
  // Set this to "/api/cv/download" once it is and the CV links will appear
  // in the navigation and footer.
  cvHref: null as string | null,
};

export const NAV_LINKS = [
  { label: "Work", href: "/#projects" },
  { label: "Exploring", href: "/#exploring" },
  { label: "Background", href: "/#background" },
  { label: "Blog", href: "/blog" },
];

export const EXPLORING = [
  {
    title: "Computational physics",
    note: "Turning equations of motion into programs whose behavior I can inspect.",
    accent: "cherenkov" as const,
  },
  {
    title: "Numerical methods",
    note: "Integrators, error and stability: knowing when a simulation deserves trust.",
    accent: "spectral" as const,
  },
  {
    title: "Astrophysics",
    note: "Orbits, gravitational systems, and signals buried in stellar data.",
    accent: "cherenkov" as const,
  },
  {
    title: "Climate and atmospheric modeling",
    note: "Fluid dynamics and differential equations at planetary scale.",
    accent: "biosphere" as const,
  },
  {
    title: "Scientific machine learning",
    note: "Where learned models meet physical constraints.",
    accent: "plasma" as const,
  },
  {
    title: "High-performance computing",
    note: "Making simulations fast enough to ask bigger questions.",
    accent: "atmosphere" as const,
  },
];

export const QUESTIONS = [
  "How do multi-body gravitational systems behave when closed-form solutions don't exist?",
  "How reliably can a model separate a real signal from noise, such as a planetary transit from a false positive?",
  "Can the same numerical tools used for orbital mechanics describe dynamics inside biological systems?",
  "What computational infrastructure does a self-taught scientist actually need to get from curiosity to a working model?",
];

// "Computation" is added at render time from the tech stacks of the
// projects in the database, so it never claims more than the work shows.
export const SKILL_GROUPS = [
  {
    title: "Mathematics",
    items: ["Linear algebra", "Differential equations", "Numerical methods"],
  },
  {
    title: "Physics and simulation",
    items: ["Orbital mechanics", "N-body dynamics", "Gravitational systems"],
  },
  {
    title: "Machine learning",
    items: ["Classification", "Model evaluation", "Applied ML pipelines"],
  },
  {
    title: "Systems design",
    items: ["Game systems design", "Worldbuilding", "Team collaboration"],
  },
];

export type TimelineEntry = {
  when: string;
  title: string;
  body: string;
  tone?: "blue" | "gold";
};

export const TIMELINE: TimelineEntry[] = [
  {
    when: "Upper Sixth",
    title: "National mathematics olympiad selection",
    body: "Placed 8th of 1,279 nationally; 2nd of 89 in Upper Sixth.",
    tone: "gold",
  },
  {
    when: "A-Levels",
    title: "4 A's, 1 B in sciences",
    body: "Entered ALU as a first-year with strong science credentials.",
  },
  {
    when: "Ongoing",
    title: "BSc Software Engineering, ALU",
    body: "African Leadership University, Kigali, Rwanda.",
    tone: "blue",
  },
  {
    when: "Two summers",
    title: "Teaching, For-All Tech Bootcamp",
    body: "Taught game programming and programming logic to children.",
  },
  {
    when: "Apr–Jul 2026",
    title: "Internship, Irembo",
    body: "Software engineering internship.",
  },
];

export const VISION =
  "Building toward computational science capacity in Africa, working from the belief that African technological independence runs through scientific computing, not around it.";

export const OUTSIDE_THE_TERMINAL =
  "Away from the terminal I train in karate (black belt) and serve as choir maestro and lead singer in my parish choir, a role I've held since childhood. I'm also active in organizing the Cameroonian community here in Rwanda.";
