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
  name: "Seth Chritzman",
  title: "Software Developer",
  blurb:
    "Software leader building data-rich products for healthcare, live media, and education. Experienced guiding early-stage teams, translating research into production systems, and delivering polished user experiences across web and cloud platforms.",
  location: "Pittsburgh, PA • Open to Remote",
  links: [
    { label: "GitHub", href: "https://github.com/sdcman27" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/seth-chritzman-40b915251",
    },
    { label: "Email", href: "mailto:sethchritzman@gmail.com" },
  ],
  keywords: [
    "Python",
    "Java",
    "TypeScript",
    "NestJS",
    "React",
    "Next.js",
    "Supabase",
    "Flask",
    "AWS",
  ],
};

export const skills: string[] = [
  "Java (Spring)",
  "TypeScript / JavaScript",
  "Python (NumPy, Pandas)",
  "Next.js & React",
  "NestJS & Supabase",
  "PostgreSQL / MySQL",
  "Flask & Django",
  "AWS & Docker",
  "TensorFlow / Keras",
];

export const experience: Experience[] = [
  {
    company: "3KG",
    role: "Chief Technology Officer",
    period: "May 2024 — Present",
    bullets: [
      "Leading development of a patent-pending platform that converts SCP, DICOM, and printed ECG data into synchronized 2D/3D visualizations shared with cardiology teams.",
      "Built cloud-hosted data pipelines with Flask, Plotly, OpenCV, and Python to deliver interactive diagnostics for each heart lead.",
      "Partner with electrical engineers and clinicians to define product roadmap and deploy HIPAA-ready infrastructure.",
    ],
    tech: ["Python", "Flask", "Plotly", "OpenCV", "AWS"],
  },
  {
    company: "Hype Live US",
    role: "Vice President of Technology",
    period: "Sep 2024 — Present",
    bullets: [
      "Architecting REST and real-time services with TypeScript, NestJS, Supabase, and AWS for social streaming features such as comments, likes, follows, and battles.",
      "Implemented real-time notifications and messaging via server-sent events (SSE) to support live interactions.",
      "Coordinating engineering priorities across mobile, web, and infrastructure teams while mentoring junior developers.",
    ],
    tech: ["TypeScript", "NestJS", "Supabase", "AWS", "SSE"],
  },
  {
    company: "Intertwined | Tutor",
    role: "STEM Instructor",
    period: "Dec 2023 — Present",
    bullets: [
      "Design personalized lesson plans aligned with student goals, learning styles, and state standards for grades 6–12.",
      "Coordinate scheduling, grade tracking, and progress reporting in partnership with school administrators and parents.",
      "Deliver one-on-one instruction that strengthens confidence in mathematics, computer science, and engineering topics.",
    ],
    tech: ["Python", "Java", "STEM Curriculum"],
    },
    {
    company: "Slippery Rock University",
    role: "Undergraduate Researcher",
    period: "Dec 2022 — May 2023",
    bullets: 
    [
      "Explored Zetta-scale computing research problems focused on scalable simulation of complex systems.",
      "Prototyped Python and C++ tooling to analyze large datasets and visualize emergent behaviors for faculty advisors.",
      "Documented findings and presented progress to the Computer Science department research cohort.",
    ],
    tech: ["Python", "C++", "Data Visualization", "Java"]
    },
];

export const projects: Project[] = [
  {
    name: "ECG 3D Visualizer",
    description:
      "Built a collaborative trading simulator in Spring/Java that exposes REST APIs, real-time pricing logic, and portfolio analytics for education use cases.",
    tech: ["Java", "Spring", "PostgreSQL"],
  },
  {
    name: "Online Examination Management (X-calibur)",
    description:
      "Created an authentication-centric web platform using Java, JSP/CRUD services, and AI chatbots to streamline exam creation, proctoring, and review workflows.",
    tech: ["Java", "JSP", "MySQL"],
  },
  {
    name: "Tobacco Usage Detection Research",
    description:
      "Researched and engineered machine learning models in Python to classify tobacco usage patterns, surfacing predictive insights for public health stakeholders.",
    tech: ["Python", "scikit-learn", "TensorFlow"],
  },
];

export const contact = {
  email: "sethchritzman@gmail.com",
  note: "Feel free to reach out for CTO, data science, or backend engineering roles. Phone: +1 (724) 333-3684.",
};
