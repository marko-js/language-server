import { TagDefinition } from "@marko/compiler/babel-utils";

export function isHTML(tag: TagDefinition | undefined) {
  return tag ? !(tag.types || tag.template || tag.renderer) && tag.html : false;
}
