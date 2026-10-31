import {
  siC,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siGnubash,
  siJavascript,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siPython,
  siR,
  siReact,
  siSocketdotio,
  siTypescript,
} from "simple-icons";

type SimpleIcon = typeof siPython;

export type Tech = {
  name: string;
  icon: SimpleIcon;
  brand: string;
};

function make(name: string, icon: SimpleIcon): Tech {
  return { name, icon, brand: `#${icon.hex}` };
}

export const tech = {
  python: make("Python", siPython),
  java: make("Java", siOpenjdk),
  javascript: make("JavaScript", siJavascript),
  typescript: make("TypeScript", siTypescript),
  c: make("C", siC),
  r: make("R", siR),
  react: make("React", siReact),
  nextjs: make("Next.js", siNextdotjs),
  node: make("Node.js", siNodedotjs),
  express: make("Express", siExpress),
  postgresql: make("PostgreSQL", siPostgresql),
  git: make("Git", siGit),
  github: make("GitHub", siGithub),
  bash: make("Bash", siGnubash),
  fastapi: make("FastAPI", siFastapi),
  socketio: make("Socket.IO", siSocketdotio),
} as const;

export type TechId = keyof typeof tech;

/** Order matters: this is the specimen-board layout. */
export const stack: TechId[] = [
  "python",
  "typescript",
  "javascript",
  "java",
  "c",
  "r",
  "react",
  "nextjs",
  "node",
  "express",
  "fastapi",
  "postgresql",
  "git",
  "github",
  "bash",
  "socketio",
];
