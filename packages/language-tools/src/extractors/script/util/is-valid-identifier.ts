import {
  isIdentifierName,
  isKeyword,
  isStrictBindReservedWord,
} from "@babel/helper-validator-identifier";

export function isValidIdentifier(name: string) {
  return (
    isIdentifierName(name) &&
    !isKeyword(name) &&
    !isStrictBindReservedWord(name, true)
  );
}
