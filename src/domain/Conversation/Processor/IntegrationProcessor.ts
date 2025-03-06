import interpolate from "../../../utils/interpolate";
import type { Journey } from "../../Journey/Journey";
import { type Engine } from "../Engine";

export class IntegrationProcessor implements Engine.StepProcessor {

  process({
    variables,
    currentState,
  }: Engine.ProcessingInput<Journey.Integration>): Engine.ProcessedInput {
    console.log("processing::integration", { currentState, variables });

    // TODO: implementar integração real

    if (!!currentState.input.mock) {
      variables[currentState.input.variableName] = {
        code: 200,
        data: JSON.parse(
          interpolate(currentState.input.mock, variables) ?? "{}",
        )
      };
    }

    return {
      nextStatus: "processed",
      selectedOutput: currentState.outputs[currentState.input.id.source],
    };
  }

}
