import type { Journey } from "../../domain/Journey/Journey";

export const unaryOperators: Record<Journey.Decision.UnaryOperator, string> = {
  exists: "existe?",
  is_true: "é verdadeiro?",
  is_false: "é falso?",
  is_number: "é um número?",
  is_string: "é um texto?",
  is_date: "é uma data?",
  is_object: "é um objeto?",
  is_array: "é uma lista?",
}

const operatorLabels: Record<Journey.Decision.Operator, string> = {
  ...unaryOperators,
  gt: "é maior que",
  gte: "é maior ou igual a",
  lt: "é menor que",
  lte: "é menor ou igual a",
  eq: "é igual a",
  ne: "não é igual a",
  in: "está contido em",
  includes: "contem",
}

export default operatorLabels;
