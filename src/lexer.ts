import { Token, TokenType, lookupKeywords } from './token';

function isLetter(ch): boolean {
  return /[a-zA-Z_]/.test(ch);
}
function isDigit(ch): boolean {
  return /\d/.test(ch);
}

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
    } else {
      this.ch = this.input[this.position];
    }
    this.readPosition += 1;
  }

  peekChar(): string {
    return this.input[this.position + 1];
  }

  newToken(type, field): Token {
    return { type, field };
  }

  readIdentifier(): string {
    const position = this.position;
    while(this.peekChar() && isLetter(this.peekChar())) {
      this.readChar();
    }
    return this.input.slice(position, this.readPosition);
  }

  readNumber(): string {
    const position = this.position;
    while(this.peekChar() && isDigit(this.peekChar())) {
      this.readChar();
    }
    return this.input.slice(position, this.readPosition);
  }

  skipWhitespace(): void {
    while(/\s/.test(this.ch)) this.readChar();
  }

  nextToken(): Token {
    let tok: Token;
    this.skipWhitespace();
    switch(this.ch) {
      case '+':
        tok = this.newToken(TokenType.PLUS, '+');
        break;
      case '-':
        tok = this.newToken(TokenType.MINUS, '-');
        break;
      case '*':
        tok = this.newToken(TokenType.ASTERISK, '*');
        break;
      case '/':
        tok = this.newToken(TokenType.SLASH, '/');
        break;
      case '!':
        tok = this.newToken(TokenType.BANG, '!');
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
        if (isLetter(this.ch)) {
          const ident = this.readIdentifier();
          const type = lookupKeywords(ident);
          tok = this.newToken(type, ident);
        } else if (isDigit(this.ch)) {
          const number = this.readNumber();
          tok = this.newToken(TokenType.INTEGER, number);
        } else {
          tok = this.newToken(TokenType.ILLEGAL, this.ch);
        }
    }
    this.readChar();
    return tok;
  }

  getTokens(): Array<Token> {
    while(true) {
      const token = this.nextToken();
      this.tokens.push(token);
      if (token.type === TokenType.ILLEGAL) {
        console.error(`Illegal token ${token.type}`);
        break;
      }
      if (token.type === TokenType.EOF) {
        break;
      }
    }
    return this.tokens;
  }
}