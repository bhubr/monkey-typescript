import { Token, TokenType } from '../src/token';

export class Lexer {
  input: string;
  position: number;
  readPosition: number;
  ch: string;
  tokens: Array<Token>;

  constructor(input) {
    this.input = input;
    this.position = 0;
    this.readPosition = 0;
    this.tokens = [];
    this.readChar();

  }

  readChar(): void {
    this.position = this.readPosition;
    if (this.position >= this.input.length) {
      this.ch = null;
      return;
    }
    this.ch = this.input[this.position];
    this.readPosition += 1;
  }

  newToken(type, field): Token {
    return { type, field };
  }

  nextToken(): Token {
    let tok: Token;
    switch(this.ch) {
      case '+':
        tok = this.newToken(TokenType.PLUS, '+');
        break;
      case '=':
        tok = this.newToken(TokenType.ASSIGN, '=');
        break;
      case '(':
        tok = this.newToken(TokenType.LPAREN, '(');
        break;
      case ')':
        tok = this.newToken(TokenType.RPAREN, ')');
        break;
      case '{':
        tok = this.newToken(TokenType.LBRACE, '{');
        break;
      case '}':
        tok = this.newToken(TokenType.RBRACE, '}');
        break;
      case ';':
        tok = this.newToken(TokenType.SEMI, ';');
        break;
      case null:
        tok = this.newToken(TokenType.EOF, null);
        break;
      default:
        tok = this.newToken(TokenType.ILLEGAL, this.ch);
    }
    this.readChar();
    return tok;
  }

  getTokens(): Array<Token> {
    let i = 0;
    while(i < 8) {
      i++;
      const token = this.nextToken();
      this.tokens.push(token);
      if (token.type === TokenType.EOF) {
        break;
      }
    }
    return this.tokens;
  }
}