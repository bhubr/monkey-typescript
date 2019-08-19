export enum TokenType {
  ASSIGN = "=",
  PLUS = "+",
  MINUS = "-",
  ASTERISK = "*",
  SLASH = "/",
  BANG = "!",
  LBRACE = "{",
  RBRACE = "}",
  LPAREN = "(",
  RPAREN = ")",
  SEMI = ";",
  EOF = "EOF",
  ILLEGAL = "ILLEGAL",
  FUNCTION = "FUNCTION",
  LET = "LET",
  RETURN = "RETURN",
  IDENT = "IDENT",
  INTEGER = "INTEGER"
}

export const keywords = new Map([
  ['let', TokenType.LET],
  ['function', TokenType.FUNCTION],
  ['return', TokenType.RETURN],
]);

export function lookupKeywords(ident): TokenType {
  const type = keywords.get(ident);
  return type || TokenType.IDENT;
}

export interface Token {
  type: TokenType;
  field: string;
}
