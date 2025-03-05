import type { Journey } from "../../domain/Journey/Journey";

const variableTypeLabels: Record<Journey.Declaration.VariableType, string> = {
  array: "lista ➔ [ ... ]",
  object: "objeto ➔ { ... }",
  boolean: "booleano ➔ true | false",
  number: "número ➔ 1, 2, 3...",
  string: `texto ➔ "Hello, world!"`,
  date: `data ➔ 1999-01-01`,
  date_time: `data e hora ➔ 1999-01-01 00:00:00`,
}

export default variableTypeLabels;
