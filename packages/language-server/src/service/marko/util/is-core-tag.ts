import type { TagDefinition } from "@marko/compiler/babel-utils";

const coreTagReg = /^@?marko[/-]/;
const markoNodeModulesReg = /[\\/]node_modules[\\/]marko[\\/]/;

/**
 * Whether a tag ships with Marko itself. Checked against the taglib id, the
 * runtime types module, and the resolved file path: which one identifies a
 * core tag varies by how the taglib was discovered (and local `components/`
 * dirs can shadow the taglib id while the types still point at the runtime).
 */
export function isCoreTag(tag: TagDefinition) {
  return (
    coreTagReg.test(tag.taglibId || tag.filePath) ||
    (typeof tag.types === "string" && coreTagReg.test(tag.types)) ||
    markoNodeModulesReg.test(tag.template || tag.renderer || tag.filePath)
  );
}
