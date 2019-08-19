export enum TokenType {
  ASSIGN = "=",
  PLUS = "+",
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

export interface Token {
  type: TokenType;
  field: string;
}
