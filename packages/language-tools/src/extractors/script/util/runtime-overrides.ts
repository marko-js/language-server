const RuntimeOverloads = new Map<string, (string | Replacement)[]>();
const commentsReg = /\/\*(?:[^*]|\*[^/])*\*\//gm;
const replaceTokensReg =
  /\babstract\s+(\w+)|Marko\.(TemplateInput(?:<[^>]+>)?|Component)|\b(Return)\b/gm;
const overrideBlockReg =
  /\/\*[*\s]*@marko-overload-start[*\s]*\*\/([\s\S]+)\/\*[*\s]*@marko-overload-end[*\s]*\*\//g;

enum Replacement {
  Generics,
  Input,
  Return,
  Component,
}

export function getRuntimeOverrides(
  runtimeTypes: string,
  generics: string,
  applyGenerics: string,
  returnType: string,
) {
  let overloads = RuntimeOverloads.get(runtimeTypes);

  if (!overloads) {
    const match = overrideBlockReg.exec(runtimeTypes);
    RuntimeOverloads.set(runtimeTypes, (overloads = []));

    if (match) {
      let [, content] = match;
      let replaceMatch: RegExpExecArray | null;
      let lastIndex = 0;
      content = content.replace(commentsReg, ""); // remove all comments within the overloads.

      while ((replaceMatch = replaceTokensReg.exec(content))) {
        const [, methodName, propertyName, returnName] = replaceMatch;
        const curText = content.slice(lastIndex, replaceMatch.index);
        lastIndex = replaceTokensReg.lastIndex;

        if (methodName) {
          overloads.push(curText + methodName, Replacement.Generics);
        } else if (returnName) {
          overloads.push(curText, Replacement.Return);
        } else {
          overloads.push(
            curText,
            propertyName === "Component"
              ? Replacement.Component
              : Replacement.Input,
          );
        }
      }

      overloads.push(content.slice(lastIndex));
    }
  }

  let result = "";
  const appliedInput = `Marko.TemplateInput<Input${applyGenerics}>`;
  const appliedComponent = `Component${applyGenerics}`;

  for (const part of overloads) {
    switch (part) {
      case Replacement.Generics:
        result += generics;
        break;
      case Replacement.Input:
        result += appliedInput;
        break;
      case Replacement.Return:
        result += returnType;
        break;
      case Replacement.Component:
        result += appliedComponent;
        break;
      default:
        result += part;
        break;
    }
  }

  return result;
}
