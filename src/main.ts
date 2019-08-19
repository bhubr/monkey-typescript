import { Lexer } from './lexer';

// const input = `let fn = function(a) { return a + 5; };`;
const input = '+ () {}; let function return ident';
const lexer = new Lexer(input);
console.log(lexer.getTokens());