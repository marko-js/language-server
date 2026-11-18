import { Project } from "@marko/language-tools";
import path from "path";
import { format } from "util";

import run, { Display } from "../../run";

Project.setDefaultTypePaths({
  internalTypesFile:
    require.resolve("@marko/language-tools/marko.internal.d.ts"),
  markoTypesFile: require.resolve("marko/index.d.ts"),
});

export interface Build {
  code: number;
  /** What mtc itself reported, in a stable order, with paths from `dir`. */
  messages: string[];
}

/** Each TypeScript mtc builds with, and how to build a project in `dir`. */
export const builds = [{ name: "typescript", build }];

async function build(dir: string, project: string): Promise<Build> {
  const messages: string[] = [];
  const { log } = console;
  const { exitCode } = process;
  console.log = (...args: unknown[]) => {
    // Paths in `dir`, as mtc writes a file's and TypeScript a module's it
    // resolved (eg an untyped package's): absolute, or from the cwd.
    const message = format(...args)
      .replaceAll(`${dir}${path.sep}`, "")
      .replaceAll(`${path.relative(process.cwd(), dir)}${path.sep}`, "")
      .trim();
    if (message) messages.push(message);
  };
  try {
    run({ project, display: Display.condensed });
    return { code: Number(process.exitCode ?? 0), messages: messages.sort() };
  } finally {
    console.log = log;
    process.exitCode = exitCode;
  }
}
