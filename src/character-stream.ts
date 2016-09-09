export class CharacterStream {

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
