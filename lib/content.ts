import type { SpriteName } from "@/components/PixelSprite";

/**
 * Every word on the site lives here. Components only decide how it looks, so
 * updating the portfolio (a new role, a new project) is an edit to this file
 * and nothing else.
 */

export const profile = {
  name: "Matias Freire",
  email: "matiaspfreire@gmail.com",
  resume: "/MatiasFreire_Resume.pdf",
  github: "https://github.com/MatiasPF1",
  linkedin: "https://www.linkedin.com/in/matias43/",
  location: "New York Metropolitan Area",
  school: "B.S. Computer Science, Stevens Institute of Technology, 2028",
};

export const experience: { role: string; org: string; period: string; detail?: string }[] = [
  {
    role: "Incoming Software Engineering Intern",
    org: "Wells Fargo",
    period: "Incoming",
  },
  {
    role: "Software Engineering Intern",
    org: "GE Transportation, a Wabtec company",
    period: "May – Jul 2026",
    detail:
      "Built a real-time locomotive monitoring system on RTI Connext DDS, FastAPI and Docker, with condition-boundary and scikit-learn diagnostics cached in Redis.",
  },
  {
    role: "Undergraduate Research Assistant",
    org: "Advanced Quantum Materials Lab",
    period: "Aug 2025 – Aug 2026",
    detail:
      "Machine learning for extraordinary magnetoresistance geometry optimization, and a Dockerized MoS₂ image synthesis and analysis platform.",
  },
];

export const leadership: { role: string; org: string; period: string; detail?: string }[] = [
  { role: "Vice President", org: "Stevens ColorStack", period: "Apr 2025 – Now" },
  { role: "Chief Web Officer", org: "Stevens SHPE", period: "Mar 2026 – Now" },
  {
    role: "Tutor-Counselor / Resident Assistant",
    org: "STEP Bridge Summer Program",
    period: "Summer 2025",
    detail: "Led recitations and tutoring for 52+ incoming freshmen.",
  },
];

export const skillGroups = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C/C++", "SQL"] },
  { label: "AI & Agents", items: ["LangChain", "LangGraph", "MCP", "RAG", "Claude API"] },
  { label: "ML & Data", items: ["PyTorch", "scikit-learn", "Keras", "XGBoost", "NumPy", "pandas"] },
  { label: "Web", items: ["React", "Next.js", "Tailwind CSS", "FastAPI", "Supabase"] },
  { label: "Systems & Data", items: ["RTI Connext DDS", "Docker", "Redis", "SQLite"] },
  { label: "Tooling", items: ["Git", "Linux", "Jupyter"] },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  repo: string;
  /** Deployed site, if there is one. */
  live?: string;
  /** Screenshot in /public. Leave out to use a pixel-art cover instead. */
  image?: string;
  /** Sprite for the pixel-art cover when there is no screenshot. */
  sprite?: SpriteName;
};

export const projects: Project[] = [
  {
    title: "SHPE Stevens Chapter Website",
    description:
      "Lead developer of the site for the Stevens Institute of Technology chapter of SHPE, supporting Hispanic students in engineering.",
    image: "/SHPE.png",
    tech: ["Next.js", "React", "TypeScript", "Supabase"],
    repo: "https://github.com/MatiasPF1/SHPE-Stevens-Chapter",
    live: "https://stevensshpe.org/",
  },
  {
    title: "ColorStack Stevens Chapter Website",
    description:
      "Lead developer of the site for the Stevens Institute of Technology chapter of ColorStack, supporting Black and Latinx students in tech.",
    image: "/Colorstack.png",
    tech: ["Next.js", "React", "TypeScript", "Supabase"],
    repo: "https://github.com/MatiasPF1/Colorstack-Stevens-Chapter",
    live: "https://stevenscolorstack.org/",
  },
  {
    title: "MoS₂ Image Synthesis & Analysis Platform",
    description:
      "A pipeline for synthesizing realistic computational scanning transmission electron microscopy (STEM) images, built for deep-learning studies of defects in 2D nanomaterials. Wraps Computem's multislice simulation behind a Dockerized Dash interface, so generation, labelling, and analysis run as one tool.",
    image: "/STEM.png",
    tech: ["PyTorch", "Computem", "Dash / Plotly", "Tooling Integration"],
    repo: "https://github.com/MatiasPF1/MoS2-Image-Synthesis-Analysis-Platform",
  },
  {
    title: "EMR Geometry ML & Bayesian Optimization",
    description:
      "Gaussian process, random forest, and XGBoost surrogates trained on ~9,000 simulated extraordinary magnetoresistance sensor geometries, with Bayesian optimization proposing new high-sensitivity shunt designs for follow-up COMSOL runs.",
    image: "/EMR.png",
    tech: ["scikit-learn", "XGBoost", "Bayesian Optimization", "PyTorch"],
    repo: "https://github.com/MatiasPF1/EMR-Machine-Learning-Bayesian-Optimization",
  },
  {
    title: "Interactive Neural Network Digit Classifier",
    description:
      "A Streamlit app where you draw a digit and watch the network's prediction update in real time, layer activations and all.",
    image: "/Interactive-Neural-Network.png",
    tech: ["PyTorch", "Streamlit", "Pygame"],
    repo: "https://github.com/MatiasPF1/Interactive-Neural-Network-Digit-Classifier",
  },
  {
    title: "SafeNYC",
    description:
      "Safest-route navigation for New York City. Every street segment is weighted by its injury-crash history and, when rain is forecast, by FloodNet street-flooding data. A* then draws the shortest route and the risk-weighted one side by side.",
    image: "/SafeNYC.png",
    tech: ["Next.js", "PostGIS", "Mapbox GL", "A* routing"],
    repo: "https://github.com/MatiasPF1/NYPL_AI",
  },
  {
    title: "SOC L1 Triage Agent",
    description:
      "An AI assistant for Level 1 security investigations. It takes one alert, retrieves similar past incidents, picks the playbooks they point to and works through each step, leaving a clickable trace. Anything consequential waits for analyst approval.",
    sprite: "shield",
    tech: ["Python", "Claude API", "pytest"],
    repo: "https://github.com/MatiasPF1/Rockwell-Aut",
  },
  {
    title: "GitSkills Mining",
    description:
      "Notebooks mining a sample of the GitSkills dataset, 29,786 agent-skill files across 11,841 GitHub repositories, to study how skills tell an agent when to act, ask, or escalate to a human.",
    sprite: "gem",
    tech: ["Python", "pandas", "SQLite", "Jupyter"],
    repo: "https://github.com/MatiasPF1/Gitskills---Skill-Policies-Research-",
  },
  {
    title: "Día de Ciencias Python Game",
    description:
      "A browser game that teaches high schoolers Python in an interactive way, made for SHPE's Día de Ciencias 2026.",
    sprite: "snake",
    tech: ["JavaScript", "HTML", "CSS"],
    repo: "https://github.com/MatiasPF1/Dia-De-Ciencias-SHPE-2026-Game",
    live: "https://dia-de-ciencias-shpe-2026-game.vercel.app",
  }
];

export const about = {
  lead: "I'm a first-generation Ecuadorian computer science student at Stevens. I like working where software meets something physical.",
  body: "Most of my time outside class goes to the communities that got me here: leading ColorStack and SHPE on campus, building their sites, and mentoring incoming students through STEP Bridge.",
};

export const moments = [
  { image: "/First-Gen.jpeg", caption: "First-generation Ecuadorian CS student" },
  { image: "/STEP.jpeg", caption: "My students during the STEP 2025 Bridge Summer Program" },
  { image: "/SHPE2025.jpeg", caption: "SHPE National Convention 2025, Philadelphia" },
  { image: "/Hackru.jpeg", caption: "My team at HackRU 2025" },
];

export const music = [
  { image: "/Malcom.jpeg", name: "Malcolm Todd" },
  { image: "/bruno-mars.jpg", name: "Bruno Mars" },
  { image: "/Enanitos_verdes.jpg", name: "Enanitos Verdes" },
  { image: "/Tame_Impala.jpg", name: "Tame Impala" },
  { image: "/Grent.jpeg", name: "grentperez" },
  { image: "/Jane_Remover.jpg", name: "Jane Remover" },
  { image: "/Laufey1.jpg", name: "Laufey" },
  { image: "/TheMarias.jpg", name: "The Marías" },
];
