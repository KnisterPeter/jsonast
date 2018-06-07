import * as Types from './types';

export class CharacterStream {

  private readonly text: string;

  private _offset = 0;

  private _line = 1;

  private _column = 1;

  constructor(text: string) {
    this.text = text;
  }

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

  get pos(): Types.PositionPart {
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
      this.expect(text);
      this.next();
  }

  public skip(text: string): boolean {
    if (this.ch === text) {
      this.next();
      return true;
    }
    return false;
  }

}
