import fs from "fs";
import path from "path";
import axe from "axe-core";

const kebabToCamelCase = (str: string) =>
  str.replaceAll(/-(.)/g, (_, char) => char.toUpperCase());

const categories: { [name: string]: axe.RuleMetadata[] } = {};

axe.getRules().forEach((rule) => {
  const cat = rule.tags.find((tag) => tag.substring(0, 3) === "cat");
  if (cat) {
    categories[cat] ??= [];
    categories[cat].push(rule);
  }
});

const contents = Object.entries(categories)
  .map(
    ([cat, rules]) => `export const ${kebabToCamelCase(cat.slice(4))} = {
${rules
  .map(
    (rule) => `  /**
   * - ${rule.description}
   * - ${rule.help} ([url](${rule.helpUrl}))
   */
  ${kebabToCamelCase(rule.ruleId)}: "${rule.ruleId}",`
  )
  .join("\n")}
} as const;`
  )
  .join("\n\n");

fs.writeFileSync(
  path.join(__dirname, "axe-rules.ts"),
  contents.replaceAll(/<[^>]*>/g, "`$&`")
);
