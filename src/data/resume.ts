export type Link = { label: string; href: string };
export type Experience = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tech?: string[];
};
export type Project = {
  name: string;
  description: string;
  href?: string;
  tech?: string[];
};

export const profile: {
  name: string;
  title: string;
  blurb: string;
  location: string;
  links: Link[];
  keywords: string[];
} = {
  name: "Seth C.",
  title: "Software Developer • Data Scientist",
  blurb:
    "I build reliable, user-centric software with a focus on backend APIs, streaming, and data visualization.",
  location: "Pittsburgh, PA • Open to Remote",
  links: [
    { label: "GitHub", href: "https://github.com/sdcman27" },
    { label: "LinkedIn", href: "#" },
    { label: "Email", href: "mailto:you@example.com" },
  ],
  keywords: ["Java","Spring","TypeScript","NestJS","Postgres","Redis","LiveKit","Cloudflare R2","Python"],
};

export const skills: string[] = [
  "Java (Spring)", "TypeScript (NestJS)", "PostgreSQL / Drizzle",
  "Redis", "Kafka (basics)", "Python", "React / Next.js", "Cloudflare R2", "Stripe"
];

export const experience: Experience[] = [
  {
    company: "BeLive",
    role: "Backend / Platform Engineer",
    period: "2024 — Present",
    bullets: [
      "Designed APIs for comments, likes, follows, and battles; consolidated image & video posts into a unified flow.",
      "Integrated LiveKit & Agora for live streaming; built multi-stream invites and real-time notifications.",
      "Refactored gifts/coins system with presigned uploads, Stripe flows, and Redis backed state.",
    ],
    tech: ["NestJS","TypeScript","Postgres","Drizzle","Redis","LiveKit","Cloudflare R2"],
  },
  {
    company: "Freelance / OSS",
    role: "Full-Stack Developer",
    period: "2021 — 2024",
    bullets: [
      "Built a Google Places-powered ordering UI in React with geo-filtered autocomplete.",
      "Created data viz tools for ECG/EKG analysis (2D/3D) using Python and Plotly.",
    ],
    tech: ["React","Next.js","Python","Plotly"],
  },
];

export const projects: Project[] = [
  {
    name: "ECG 3D Visualizer",
    description: "Web app that turns 12-lead ECG data into synchronized 2D/3D visualizations with upload pipeline.",
    href: "#",
    tech: ["Flask","Plotly","OpenCV"],
  },
  {
    name: "BeLive Posts Service",
    description: "Unified images/videos pipeline with presigned uploads and combined feed.",
    href: "#",
    tech: ["NestJS","Drizzle","Cloudflare R2"],
  },
  {
    name: "CurtsDirt",
    description: "Simple order flow for a local topsoil business; modern React frontend.",
    href: "#",
    tech: ["React","Vite"],
  },
];

export const contact = {
  email: "you@example.com",
  note: "Best reached by email. Open to contract or full-time roles.",
};
