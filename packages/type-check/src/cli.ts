#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { createRequire } from "module";
import arg from "arg";
import color from "kleur";
import run, { Display } from "./run";

const args = arg(
  {
    "--project": String,
    "--display": String,
    "--help": Boolean,
    "--version": Boolean,
    "-p": "--project",
    "-d": "--display",
    "-h": "--help",
    "-v": "--version",
  },
  { permissive: false, argv: process.argv.slice(2) }
);

if (args["--help"]) {
  console.log(`${color.bold(
    `Usage: ${color.cyan("marko-type-check")} ${color.magenta(
      `[options]`
    )} | ${color.cyan("mtc")} ${color.magenta(`[options]`)}\n`
  )}
A command-line interface for running type checks on .marko, .ts, and .js files.

${color.bold("Options:")}
  ${color.yellow("-p, --project")} ${color.magenta(
    "<path>"
  )}       Path to the tsconfig or jsconfig file (default: ${color.green(
    `"./tsconfig.json"`
  )} or ${color.green(`"./jsconfig.json"`)})
  ${color.yellow("-d, --display")} ${color.magenta(
    "<type>"
  )}       Set the display type for error output. Choices: ${color.green(
    `"codeframe"`
  )} or ${color.green(`"condensed"`)} (default: ${color.green(`"codeframe"`)})
  ${color.yellow(
    "-v, --version"
  )}              Display the CLI version, Marko version, and TypeScript version
  ${color.yellow("-h, --help")}                 Display this help text

${color.bold("Examples:")}
  ${color.cyan("marko-type-check")} --project ./tsconfig.json
  ${color.cyan("mtc")} -p ./jsconfig.json -d condensed -e

For more information, visit ${color.blue(
    "https://github.com/marko-js/language-server/tree/main/packages/marko-type-check"
  )}
`);
} else if (args["--version"]) {
  const require = createRequire(__filename);
  const getPackageVersion = (id: string) => {
    try {
      return `${id} v${require(`${id}/package.json`).version}`;
    } catch {
      return `${id} unknown version`;
    }
  };
  console.log(
    `marko-type-check v${require("../package.json").version} (${[
      getPackageVersion("marko"),
      getPackageVersion("@marko/compiler"),
      getPackageVersion("typescript"),
    ].join(", ")})`
  );
} else {
  const {
    "--display": display = process.env.CI
      ? Display.condensed
      : Display.codeframe,
  } = args;
  let { "--project": project } = args;

  if (project) {
    project = path.resolve(process.cwd(), project);
    if (!fs.existsSync(project)) {
      throw new Error(`Project path does not exist: ${project}`);
    }
  }

  checkDisplay(display);
  run({ project, display });
}

function checkDisplay(
  display: string | undefined
): asserts display is Display | undefined {
  if (display && (Display as any)[display] === undefined) {
    throw new Error(
      `Invalid display option, must be one of: ${Object.values(Display).join(
        ", "
      )}`
    );
  }
}
