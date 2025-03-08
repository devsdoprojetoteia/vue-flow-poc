import type { Journey } from "../../Journey/Journey";
import { type Engine } from "../Engine";

export class RootProcessor implements Engine.StepProcessor {

  process({
    variables,
    currentState,
  }: Engine.ProcessingInput<Journey.Root>): Engine.ProcessedInput {
    console.log("processing::root", { currentState, variables });

    return {
      nextStatus: "processed",
      selectedOutput: currentState.outputs[currentState.input.id.source],
    };
  }

}
