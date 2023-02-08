const RuntimeOverloads = new Map<string, (string | Replacement)[]>();
const replaceReg = /\babstract\s+(\w+)|Marko\.(TemplateInput|Component)/gm;
const commentRegex =
  /\/\*[*\s]*@marko-overload-start[*\s]*\*\/([\s\S]+)\/\*[*\s]*@marko-overload-end[*\s]*\*\//g;

enum Replacement {
  Generics,
  Input,
  Component,
}

export function getRuntimeOverrides(
  runtimeTypes: string,
  generics: string,
  applyGenerics: string
) {
  let overloads = RuntimeOverloads.get(runtimeTypes);

  if (!overloads) {
    const match = commentRegex.exec(runtimeTypes);
    RuntimeOverloads.set(runtimeTypes, (overloads = []));

    if (match) {
      const [, content] = match;
      let replaceMatch: RegExpExecArray | null;
      let lastIndex = 0;

      while ((replaceMatch = replaceReg.exec(content))) {
        const [, methodName, propertyName] = replaceMatch;
        const curText = content.slice(lastIndex, replaceMatch.index);
        lastIndex = replaceReg.lastIndex;

        if (methodName) {
          overloads.push(curText + methodName, Replacement.Generics);
        } else {
          overloads.push(
            curText,
            propertyName === "TemplateInput"
              ? Replacement.Input
              : Replacement.Component
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
