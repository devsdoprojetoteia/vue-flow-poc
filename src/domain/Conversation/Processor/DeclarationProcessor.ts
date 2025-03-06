import interpolate from "../../../utils/interpolate";
import type { Journey } from "../../Journey/Journey";
import { type Engine } from "../Engine";

export class DeclarationProcessor implements Engine.StepProcessor {

  readonly declaratorByType: Record<
    Journey.Declaration.VariableType,
    (value?: string) => any
  > = {
    "string": (value) => value && `${value}`,
    "number": (value) => {
      if (!value) return value;
      const numericValue = +value;
      return isNaN(numericValue) ? undefined : numericValue;
    },
    "date": (value) => {
      if (!value) return value;
      const dateValue = new Date(value);
      return isNaN(dateValue.getTime()) ? undefined : dateValue;
    },
    "date_time": (value) => {
      if (!value) return value;
      const dateTimeValue = new Date(value);
      return isNaN(dateTimeValue.getTime()) ? undefined : dateTimeValue;
    },
    "boolean": (value) => {
      if (!value) return value;
      if (value === "true" || value === "1") return true;
      if (value === "false" || value === "0") return false;
      return undefined;
    },
    "object": (value) => value && JSON.parse(value),
    "array": (value) => value && JSON.parse(value),
  }

  process({
    variables,
    currentState,
  }: Engine.ProcessingInput<Journey.Declaration>): Engine.ProcessedInput {
    console.log("processing::declaration", { currentState, variables });

    const declarator = this.declaratorByType[currentState.input.variable.type];
    variables[currentState.input.variable.name] = declarator(
      interpolate(currentState.input.variable.value, variables),
    );

    return {
      nextStatus: "processed",
      selectedOutput: currentState.outputs[currentState.input.id.source],
    };
  }

}
