import interpolate from "../../../utils/interpolate";
import type { Journey } from "../../Journey/Journey";
import { type Engine } from "../Engine";

export class DecisionProcessor implements Engine.StepProcessor {

  private readonly hypothesesByOperator: Record<
    Journey.Decision.Operator,
    (left: any, right?: any) => boolean
  > = {
      "exists": (left) => left !== undefined && left !== null,
      "is_true": (left) => left === true || left === "true" || left === 1,
      "is_false": (left) => left === false || left === "false" || left === 0,
      "is_number": (left) => !isNaN(left),
      "is_string": (left) => typeof left === 'string',
      "is_date": (left) => {
        if (left instanceof Date) return !isNaN(left.getTime());
        if (typeof left === 'string') return !isNaN(new Date(left).getTime());
        return false;
      },
      "is_object": (left) =>
        typeof left === 'object' && left !== null && !Array.isArray(left),
      "is_array": (left) => Array.isArray(left),
      "gt": (left, right) => {
        const numLeft = Number(left);
        const numRight = Number(right);
        return !isNaN(numLeft) && !isNaN(numRight) && numLeft > numRight;
      },
      "gte": (left, right) => {
        const numLeft = Number(left);
        const numRight = Number(right);
        return !isNaN(numLeft) && !isNaN(numRight) && numLeft >= numRight;
      },
      "lt": (left, right) => {
        const numLeft = Number(left);
        const numRight = Number(right);
        return !isNaN(numLeft) && !isNaN(numRight) && numLeft < numRight;
      },
      "lte": (left, right) => {
        const numLeft = Number(left);
        const numRight = Number(right);
        return !isNaN(numLeft) && !isNaN(numRight) && numLeft <= numRight;
      },
      "eq": (left, right) => {
        if (typeof left === 'object' || typeof right === 'object') {
          return JSON.stringify(left) === JSON.stringify(right);
        }
        return left == right;
      },
      "ne": (left, right) => {
        if (typeof left === 'object' || typeof right === 'object') {
          return JSON.stringify(left) !== JSON.stringify(right);
        }
        return left != right;
      },
      "in": (left, right) => {
        try {
          const arr = Array.isArray(right) ? right : JSON.parse(String(right || '[]'));
          return arr.includes(left);
        } catch {
          return false;
        }
      },
      "includes": (left, right) => {
        try {
          const arr = Array.isArray(left) ? left : JSON.parse(String(left || '[]'));
          return arr.includes(right);
        } catch {
          return false;
        }
      },
    };

  process({
    variables,
    currentState,
  }: Engine.ProcessingInput<Journey.Decision>): Engine.ProcessedInput {
    console.log("processing::message", { currentState, variables });

    for (const tree of currentState.input.expressions) {
      if (
        this.hypothesesByOperator[tree.expression.operator](
          interpolate(tree.expression.left.toString(), variables),
          interpolate(tree.expression.right?.toString(), variables),
        )
      ) {
        return { 
          nextStatus: "processed",
          selectedOutput: currentState.outputs[tree.id.source],
        };
      };
    }

    return {
      nextStatus: "processed",
      selectedOutput: currentState.outputs[currentState.input.default.source],
    };
  }

}
