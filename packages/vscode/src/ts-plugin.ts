import { init } from "../../language-server/src/ts-plugin";

// Explicitly use commonjs here to avoid the typescript error:
// eventually should be resolved by https://github.com/microsoft/TypeScript/issues/49270
export = init;
