import * as Types from './types';
export * from './types';

export default function parse(text: string): any {
  let result: Types.Node | undefined = undefined;
  const cs = new CharacterStream(text);
  ws(cs);
  if (cs.ch === '{') {
    result = object(cs);
  } else if (cs.ch === '[') {
    result = array(cs);
  }
  ws(cs);
  if (!cs.eoi) {
    throw new Error(`Unexpected character '${cs.ch}' at ${cs.line}:${cs.column}. Expected end of input.`);
  }
  if (result === undefined) {
    throw new Error('Nothing parsed');
  }
  return result;
}

function object(cs: CharacterStream): Types.Object {
  function members(cs1: CharacterStream): Types.Pair[] {
    function pair(cs2: CharacterStream): Types.Pair {
      ws(cs2);
      let key = string(cs2);
      ws(cs2);
      cs2.accept(':');
      return {
        key,
        value: value(cs2)
      };
    }

    const members: Types.Pair[] = [];
    let next = true;
    while (next) {
      members.push(pair(cs1));
      ws(cs1);
      if (cs1.ch === ',') {
        cs1.next();
      } else if (cs1.ch === '"') {
        // This is probably a missing comma
      } else {
        next = false;
      }
    }
    return members;
  }

  const ast: Types.Object = {
    type: 'object',
    pos: {
      start: cs.pos,
      end: cs.pos
    }
  };

  ws(cs);
  cs.accept('{');
  ws(cs);
  if (cs.ch === '"') {
    ast.members = members(cs);
  }
  ws(cs);
  cs.accept('}');
  ast.pos.end = cs.pos;

  return ast;
}

function array(cs: CharacterStream): Types.Array {
  const ast: Types.Array = {
    type: 'array',
    pos: {
      start: cs.pos,
      end: cs.pos
    }
  };
  ws(cs);
  cs.accept('[');
  if (cs.ch !== ']') {
    ast.elements = [];
    let next = true;
    while (next) {
      ast.elements.push(value(cs));
      ws(cs);
      if (cs.ch === ',') {
        cs.next();
      } else if (cs.ch !== ']') {
        // This is probably a missing comma
      } else {
        next = false;
      }
    }
  }
  ws(cs);
  cs.accept(']');
  ast.pos.end = cs.pos;
  return ast;
}

function value(cs: CharacterStream): Types.Value {
  ws(cs);
  if (cs.ch === '"') {
    return string(cs);
  } else if (cs.ch === '{') {
    return object(cs);
  } else if (cs.ch === '[') {
    return array(cs);
  } else if (cs.ch === 't' || cs.ch === 'f' || cs.ch === 'n') {
    return literal(cs);
  }
  return number(cs);
}

function string(cs: CharacterStream): Types.String {
  const start = cs.pos;
  let value = '';
  cs.accept('"');
  while (cs.ch !== '"') {
    value += cs.ch;
    cs.next();
  }
  cs.accept('"');
  return {
    type: 'string',
    value,
    pos: {
      start,
      end: cs.pos
    }
  };
}

function literal(cs: CharacterStream): Types.Literal {
  ws(cs);
  const start = cs.pos;
  if (cs.ch === 't') {
    cs.accept('true');
    return {
      type: 'true',
      pos: {
        start,
        end: cs.pos
      }
    };
  } else if (cs.ch === 'f') {
    cs.accept('false');
    return {
      type: 'false',
      pos: {
        start,
        end: cs.pos
      }
    };
  } else if (cs.ch === 'n') {
    cs.accept('null');
    return {
      type: 'null',
      pos: {
        start,
        end: cs.pos
      }
    };
  }
  throw new Error('Illegal literal');
}

function number(cs: CharacterStream): Types.Number {
  function digit(): string {
    let number = '';
    const ch = cs.ch;
    if (ch === '0' || ch === '1' || ch === '2' || ch === '3' || ch === '4' ||
        ch === '5' || ch === '6' || ch === '7' || ch === '8' || ch === '9') {
      number = ch;
      cs.next();
    }
    return number;
  }
  function digits(): string {
    let number = digit();
    let temp = digit();
    while (temp !== '') {
      number += temp;
      temp = digit();
    }
    return number;
  }

  const start = cs.pos;
  const negative = cs.skip('-') ? '-' : '';
  let int: string;
  if (cs.ch === '0') {
    int = cs.ch;
    cs.next();
  } else {
    int = digits();
  }
  let frac = '';
  if (cs.ch === '.') {
    cs.next();
    frac = '.' + digits();
  }
  let exp = '';
  if (cs.ch === 'e' || cs.ch === 'E') {
    cs.next();
    exp = 'e';
    exp += cs.skip('+') ? '+' : '';
    exp += cs.skip('-') ? '-' : '';
    exp += digits();
  }

  return {
    type: 'number',
    value: parseFloat(`${negative}${int}${frac}${exp}`),
    pos: {
      start,
      end: cs.pos
    }
  };
}

function ws(cs: CharacterStream): void {
  let next = true;
  while (next) {
    next = cs.skip(' ') ||
      cs.skip('\t') ||
      cs.skip('\n') ||
      cs.skip('\r');
  }
}

class CharacterStream {

  private _offset: number = 0;

  private _line: number = 1;

  private _column: number = 1;

  constructor(private text: string) {}

  get ch(): string {
    return this.text.charAt(this._offset);
  }

  get eoi(): boolean {
    return this.text.length === this._offset;
  }

  get line(): number {
    return this._line;
  }

  get column(): number {
    return this._column;
  }

  get offset(): number {
    return this._offset;
  }

  get pos(): {line: number; column: number; char: number} {
    return {
      line: this.line,
      column: this.column,
      char: this.offset
    };
  }

  public expect(text: string): void {
    if (this.ch !== text) {
      const ch = this.ch
        .replace('\n', '\\n')
        .replace('\r', '\\r')
        .replace('\t', '\\t');
      throw new Error(`Unexpected character '${ch}' at ${this.line}:${this.column}. Expected '${text}'`);
    }
  }

  public next(): void {
    if (this.ch === '\n') {
      this._column = 1;
      this._line++;
    } else {
      this._column++;
    }
    this._offset++;
  }

  public accept(text: string): void {
    const remember = this._offset;
    try {
      for (let i = 0, n = text.length; i < n; i++) {
        this.expect(text.charAt(i));
        this.next();
      }
    } catch (e) {
      this._offset = remember;
      throw new Error(`Unexpected character '${this.ch}' at ${this.line}:${this.column}. Expected '${text}'`);
    }
  }

  public skip(text: string): boolean {
    if (this.ch === text) {
      this.next();
      return true;
    }
    return false;
  }

}
