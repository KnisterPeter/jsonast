export interface JsonNode {
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

export interface JsonObject extends JsonNode {
  type: 'object';
  members?: Pair[];
}

export interface Pair {
  key: JsonString;
  value: JsonValue;
}

export interface JsonArray extends JsonNode {
  type: 'array';
  elements?: JsonValue[];
}

export type JsonValue = JsonString | JsonNumber | JsonObject | JsonArray | JsonLiteral;

export interface JsonString extends JsonNode {
  type: 'string';
  value: string;
}

export interface JsonNumber extends JsonNode {
  type: 'number';
  value: number;
}

export interface JsonLiteral extends JsonNode {
  type: 'true' | 'false' | 'null';
}
