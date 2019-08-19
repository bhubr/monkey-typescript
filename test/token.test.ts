import { expect } from 'chai';
import { TokenType } from '../src/token';
import { Lexer } from '../src/lexer';

describe('lexer', () => {

  it('produces tokens from simple input', () => {
    const input = '! +-*/ () {} ; let function return ident';
    const lexer = new Lexer(input);
    const tokens = lexer.getTokens();
    expect(tokens).to.deep.equal([
      { type: TokenType.BANG, field: '!' },
      { type: TokenType.PLUS, field: '+' },
      { type: TokenType.MINUS, field: '-' },
      { type: TokenType.ASTERISK, field: '*' },
      { type: TokenType.SLASH, field: '/' },
      { type: TokenType.LPAREN, field: '(' },
      { type: TokenType.RPAREN, field: ')' },
      { type: TokenType.LBRACE, field: '{' },
      { type: TokenType.RBRACE, field: '}' },
      { type: TokenType.SEMI, field: ';' },
      { type: TokenType.LET, field: 'let' },
      { type: TokenType.FUNCTION, field: 'function' },
      { type: TokenType.RETURN, field: 'return' },
      { type: TokenType.IDENT, field: 'ident' },
      { type: TokenType.EOF, field: null },
    ]);
  });
  it('produces tokens from input', () => {
    const input = `let fn = function(a) { return a + 5; };`;
    const lexer = new Lexer(input);
    const tokens = lexer.getTokens();
    expect(tokens).to.deep.equal([
      { type: TokenType.LET, field: 'let' },
      { type: TokenType.IDENT, field: 'fn' },
      { type: TokenType.ASSIGN, field: '=' },
      { type: TokenType.FUNCTION, field: 'function' },
      { type: TokenType.LPAREN, field: '(' },
      { type: TokenType.IDENT, field: 'a' },
      { type: TokenType.RPAREN, field: ')' },
      { type: TokenType.LBRACE, field: '{' },
      { type: TokenType.RETURN, field: 'return' },
      { type: TokenType.IDENT, field: 'a' },
      { type: TokenType.PLUS, field: '+' },
      { type: TokenType.INTEGER, field: '5' },
      { type: TokenType.SEMI, field: ';' },
      { type: TokenType.RBRACE, field: '}' },
      { type: TokenType.SEMI, field: ';' },
      { type: TokenType.EOF, field: null },
    ]);
  });
});