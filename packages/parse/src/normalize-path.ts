import path from "path";

const sepReg = /\//g;

export const normalizePath: (filename: string) => string =
  path.sep === "/"
    ? (filename) => filename
    : (filename) => filename.replace(sepReg, path.sep);
