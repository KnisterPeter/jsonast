export interface Node {
  type: string;
  pos: {
    start: {
      line: number;
      column: number;
      char: number;
    };
    end: {
      line: number;
      column: number;
      char: number;
    };
  };
}

export interface Object extends Node {
  type: 'object';
  members?: Pair[];
}

export interface Pair {
  key: String;
  value: Value;
}

export interface Array extends Node {
  type: 'array';
  elements?: Value[];
}

export type Value = String|Number|Object|Array|Literal;

export interface String extends Node {
  type: 'string';
  value: string;
}

export interface Number extends Node {
  type: 'number';
  value: number;
}

export interface Literal extends Node {
  type: 'true' | 'false' | 'null';
}
