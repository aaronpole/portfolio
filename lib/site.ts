import type { TechId } from "@/lib/tech";

/**
 * Public destinations, kept in one place so the UI never drifts.
 */
export const links = {
  github: "https://www.github.com/aaronpole",
  linkedin: "https://www.linkedin.com/in/aaron-paul-762248328/",
  instagram: "https://www.instagram.com/aaronpaul.xo/",
  email: "aaron4pole@gmail.com",
} as const;

/**
 * TODO: replace with the live domain before deploying.
 * Used for canonical URLs and social previews.
 */
export const siteUrl = "https://aaronpaul.dev";

export const emailHref = `mailto:${links.email}`;

export const nav = [
  { id: "about", label: "About", index: "01" },
  { id: "work", label: "Work", index: "02" },
  { id: "experience", label: "Experience", index: "03" },
  { id: "stack", label: "Stack", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
] as const;

export const interests = [
  "Backend development",
  "Data",
  "Real-time systems",
  "Product development",
  "Creative technology",
] as const;

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  note: string;
  tech: TechId[];
  github: string;
  live?: string;
  visual: "seater" | "mafia" | "motherjane";
  caption: string;
};

export const projects: Project[] = [
  {
    id: "mecseater",
    index: "01",
    title: "MECSeater",
    category: "Web application",
    summary:
      "Exam seating without the notice-board scramble. Students enter a name or roll number and get their seat in seconds, replacing the morning crowd around a printed list.",
    note: "A small, high-traffic utility where the only job is a clear answer.",
    tech: ["nextjs", "react", "typescript", "python", "fastapi", "postgresql"],
    github: "https://github.com/aaronpole/mecseater",
    live: "https://mecseater.vercel.app/",
    visual: "seater",
    caption: "Seat lookup model — schematic, not a screenshot.",
  },
  {
    id: "mafia",
    index: "02",
    title: "Mafia",
    category: "Real-time game",
    summary:
      "A social deduction game for up to 16 players. The server owns the truth: roles stay private, night phases move in real time, and a dropped phone can rejoin without ending the round.",
    note: "Server-authoritative logic, private information, and a network that has to forgive.",
    tech: ["react", "node", "express", "socketio"],
    github: "https://github.com/aaronpole/mafia-game",
    live: "https://mafia-rho-lac.vercel.app/",
    visual: "mafia",
    caption: "Role distribution across a 16-seat table — schematic.",
  },
  {
    id: "motherjane",
    index: "03",
    title: "motherjane",
    category: "R package",
    summary:
      "An extensible R package that turns text into quantitative signals. Multiple sentiment lexicons, numeric-aware scoring, and modular pipelines that adapt to different datasets.",
    note: "Built for researchers who need the reasoning to stay inspectable.",
    tech: ["r"],
    github: "https://github.com/aaronpole/motherjane",
    visual: "motherjane",
    caption: "Text-to-signal pipeline — schematic, not a screenshot.",
  },
];

export const experience = [
  {
    index: "01",
    role: "Student Marketeer",
    org: "Red Bull",
    period: "Jan 2026 — Aug 2026",
    description:
      "Campus activations, events and peer-to-peer brand work — turning a global product into something local.",
  },
  {
    index: "02",
    role: "Design Lead",
    org: "NSDC MEC",
    period: "",
    description:
      "Visual direction and design output for the chapter: identity, campaigns and the details that hold them together.",
  },
  {
    index: "03",
    role: "International Services Chair",
    org: "Rotaract MEC",
    period: "",
    description:
      "Coordinating international service initiatives and the people who make them happen.",
  },
] as const;

export const intro = {
  name: "Aaron Paul",
  role: "Computer Science & Business Systems",
  tagline: "Developer & creative technologist",
  statement:
    "I build software that solves the small, real problem in front of me — then keep going until it becomes something worth showing.",
};
