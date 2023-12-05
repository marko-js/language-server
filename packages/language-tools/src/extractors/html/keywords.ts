const builtinTagsRegex =
  /^(?:a(?:(?:bbr|cronym|ddress|pplet|r(?:ea|ticle)|side|udio))?|b(?:(?:ase(?:font)?|d[io]|gsound|ig|l(?:ink|ockquote)|ody|r|utton))?|c(?:a(?:nvas|ption)|enter|ite|o(?:de|l(?:group)?|mmand|ntent))|d(?:ata(?:list)?|d|e(?:l|tails)|fn|i(?:alog|r|v)|l|t)|e(?:lement|m(?:bed)?)|f(?:i(?:eldset|g(?:caption|ure))|o(?:nt|oter|rm)|rame(?:set)?)|h(?:1|2|3|4|5|6|ead(?:er)?|group|r|tml)|i(?:(?:frame|m(?:age|g)|n(?:put|s)|sindex))?|k(?:bd|eygen)|l(?:abel|egend|i(?:(?:nk|sting))?)|m(?:a(?:in|p|r(?:k|quee)|th)|e(?:nu(?:item)?|t(?:a|er))|ulticol)|n(?:av|extid|o(?:br|embed|frames|script))|o(?:bject|l|pt(?:group|ion)|utput)|p(?:(?:aram|icture|laintext|r(?:e|ogress)))?|q|r(?:bc?|p|tc?|uby)|s(?:(?:amp|cript|e(?:ction|lect)|hadow|lot|mall|ource|pa(?:cer|n)|t(?:r(?:ike|ong)|yle)|u(?:b|mmary|p)|vg))?|t(?:able|body|d|e(?:mplate|xtarea)|foot|h(?:ead)?|i(?:me|tle)|r(?:ack)?|t)|ul?|v(?:ar|ideo)|wbr|xmp)$/;

export function isHTMLTag(tag: string) {
  return builtinTagsRegex.test(tag);
}

export enum AttributeValueType {
  True,
  Literal,
  QuotedString,
  Dynamic,
}

export function getAttributeValueType(
  value: string | undefined,
): AttributeValueType | undefined {
  if (value === undefined || value[0] !== "=") return undefined;
  value = value.substring(1).trim(); // Remove "=" from value

  switch (value) {
    case "NaN":
    case "Infinity":
    case "-Infinity":
      return AttributeValueType.Literal;
    case "null":
    case "false":
    case "undefined":
      return undefined;
    case "true":
      return AttributeValueType.True;
  }

  if (
    // double quote string
    /^"(?:[^"\\]+|\\.)*"$/.test(value) ||
    // single quote string
    /^'(?:[^'\\]+|\\.)*'$/.test(value) ||
    // template literal without any interpolations
    /^`(?:[^`\\$]+|\\.|\$(?!\{))*`$/.test(value)
  ) {
    return AttributeValueType.QuotedString;
  } else if (
    // octal literal
    /^-?0[oO]?[0-7](?:_?[0-7]+)*n?$/.test(value) ||
    // hex literal
    /^-?0[xX][0-9a-fA-F](?:_?[0-9a-fA-F]+)*n?$/.test(value) ||
    // binary literal
    /^-?0[bB][01](?:_?[01]+)*n?$/.test(value) ||
    // integer or float
    /^-?\d(?:_?\d+)*(?:[.eE]\d(?:_?\d+)*|n?|\.?)$/.test(value)
  ) {
    return AttributeValueType.Literal;
  }

  return AttributeValueType.Dynamic;
}
