import { TextDocument } from "vscode-languageserver";

export type LanguageId =
  | "marko"
  | "css"
  | "scss"
  | "less"
  | "javascript"
  | "typescript";

export type RegionType = "template" | "script" | "style" | "custom";

export interface EmbeddedRegion {
  languageId: LanguageId;
  start: number;
  end: number;
  type: RegionType;
}

function strip(content: string, region: EmbeddedRegion, type: RegionType) {
  let newContent: string = content;
  function doStrip(stripper: string) {
    if (newContent.startsWith(stripper)) {
      newContent = newContent.slice(stripper.length);
    }
  }
  // Strips content of needleess text
  if (type === "style") {
    doStrip(`${type}.${region.languageId}`);
    doStrip(type);
  }
  return newContent;
}

export function getSingleTypeDocument(
  document: TextDocument,
  regions: EmbeddedRegion[],
  type: RegionType
): TextDocument {
  const oldContent = document.getText();
  let newContent = oldContent
    .split("\n")
    .map(line => " ".repeat(line.length))
    .join("\n");

  let langId: string = defaultLanguageIdForBlockTypes[type];

  for (const r of regions) {
    if (r.type === type) {
      newContent =
        newContent.slice(0, r.start) +
        oldContent.slice(r.start, r.end) +
        newContent.slice(r.end);
      newContent = strip(newContent, r, type);
      langId = r.languageId;
    }
  }

  return TextDocument.create(
    document.uri,
    langId,
    document.version,
    newContent
  );
}

const defaultLanguageIdForBlockTypes: { [type: string]: string } = {
  template: "marko",
  script: "javascript",
  style: "css"
};

// export function parseMarkoRegions(document: TextDocument) {
//     const regions: EmbeddedRegion[] = [];
//     const text = document.getText();
//     const scanner = createScanner(text);
//     let lastTagName = '';
//     let lastAttributeName = '';
//     let languageIdFromType: LanguageId | '' = '';
//     const importedScripts: string[] = [];

//     let token = scanner.scan();
//     while (token !== TokenType.EOS) {
//       switch (token) {
//         case TokenType.Styles:
//           regions.push({
//             languageId: /^(sass|scss|less|postcss|stylus)$/.test(languageIdFromType)
//               ? (languageIdFromType as LanguageId)
//               : defaultCSSLang,
//             start: scanner.getTokenOffset(),
//             end: scanner.getTokenEnd(),
//             type: 'style'
//           });
//           languageIdFromType = '';
//           break;
//         case TokenType.Script:
//           regions.push({
//             languageId: languageIdFromType ? languageIdFromType : defaultScriptLang,
//             start: scanner.getTokenOffset(),
//             end: scanner.getTokenEnd(),
//             type: 'script'
//           });
//           languageIdFromType = '';
//           break;
//         case TokenType.StartTag:
//           const tagName = scanner.getTokenText();
//           if (tagName === 'template') {
//             const templateRegion = scanTemplateRegion(scanner, text);
//             if (templateRegion) {
//               regions.push(templateRegion);
//             }
//           }
//           lastTagName = tagName;
//           lastAttributeName = '';
//           break;
//         case TokenType.AttributeName:
//           lastAttributeName = scanner.getTokenText();
//           break;
//         case TokenType.AttributeValue:
//           if (lastAttributeName === 'lang') {
//             languageIdFromType = getLanguageIdFromLangAttr(scanner.getTokenText());
//           } else {
//             if (lastAttributeName === 'src' && lastTagName.toLowerCase() === 'script') {
//               let value = scanner.getTokenText();
//               if (value[0] === "'" || value[0] === '"') {
//                 value = value.slice(1, value.length - 1);
//               }
//               importedScripts.push(value);
//             }
//           }
//           lastAttributeName = '';
//           break;
//         case TokenType.EndTagClose:
//           lastAttributeName = '';
//           languageIdFromType = '';
//           break;
//       }
//       token = scanner.scan();
//     }

//     return {
//       regions,
//       importedScripts
//     };
//   }
