import type { Journey } from "../../Journey/Journey";
import { type Engine } from "../Engine";

export class TextInputProcessor implements Engine.StepProcessor {

  process({
    variables,
    currentState,
  }: Engine.ProcessingInput<Journey.TextInput>): Engine.ProcessedInput {
    console.log("processing::text-input", { currentState, variables });

    return {
      handleNextUserInput: (input) => {
        variables[currentState.input.variableName] = input?.content;

        return {
          nextStatus: "processed",
          selectedOutput: currentState.outputs[currentState.input.id.source],
        };
      },
      nextStatus: "waiting_input",
    };
  }

}
