export default function RegExpBuilder(
  strings: TemplateStringsArray,
  ...expressions: [unknown, ...unknown[]]
) {
  let i = 0;
  let src = strings[0].slice(strings[0].indexOf("/") + 1);
  const secondLastExprIndex = strings.length - 2;

  for (; i < secondLastExprIndex; i++) {
    src += escape(expressions[i]) + strings[i + 1];
  }

  src += escape(expressions[i]);

  const lastStr = strings[i + 1];
  const lastSlashIndex = lastStr.lastIndexOf("/");
  let flags = "";

  if (lastSlashIndex === -1) {
    src += lastStr;
  } else {
    flags = lastStr.slice(lastSlashIndex + 1);
    src += lastStr.slice(0, lastSlashIndex);
  }

  return new RegExp(src, flags);
}

function escape(val: unknown) {
  return String(val).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
