declare module "@marko/prettyprint";
declare module "marko/compiler";
declare module "marko/compiler/CodeWriter";
declare module "marko/env";
declare module "htmljs-parser";

interface IMarkoErrorOutput {
  code: string;
  context: any;
  message: string;
  node: any;
  pos: IMarkoErrorPosInfo;
  endPos: IMarkoErrorPosInfo;
}

interface IMarkoErrorPosInfo {
  column: number;
  line: number;
  path: string;
}

interface IMarkoAttribute {
  allowExpressions: boolean;
  html: boolean;
  name: string;
  pattern: string;
  required: boolean;
  setFlag: string;
  type: string;
  enum: string[];
  filePath: string;
  key: string;
}
