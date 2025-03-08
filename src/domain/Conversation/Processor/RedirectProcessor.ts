import type { Journey } from "../../Journey/Journey";
import { type Engine } from "../Engine";

export class RedirectProcessor implements Engine.StepProcessor {

  process({
    currentState,
    secondaryRoots,
  }: Engine.ProcessingInput<Journey.Redirect>): Engine.ProcessedInput {
    console.log("processing::redirect", { currentState, secondaryRoots });

    const selectedOutput = secondaryRoots.find(({ input }) => {
      return input.journeyId.source === currentState.input.targetJourneyId?.source;
    });

    if (!selectedOutput) {
      throw Error(`Não foi possível redirecionar do nó \
        ${currentState.input.title} para a jornada \
        ${currentState.input.targetJourneyId?.source}.`);
    }

    return {
      nextStatus: "processed",
      selectedOutput: selectedOutput.outputs[selectedOutput.input.id.source],
    };
  }

}
