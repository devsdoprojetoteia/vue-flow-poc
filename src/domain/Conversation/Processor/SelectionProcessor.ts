import interpolate from "../../../utils/interpolate";
import UUID from "../../../utils/UUID";
import type { Journey } from "../../Journey/Journey";
import { type Engine } from "../Engine";

export class SelectionProcessor implements Engine.StepProcessor {

  process({
    variables,
    currentState,
    sendMessage,
  }: Engine.ProcessingInput<Journey.Selection>): Engine.ProcessedInput {
    console.log("processing::selection", { currentState, variables });

    sendMessage({
      id: UUID.random(),
      content: interpolate(currentState.input.content, variables),
      outputMetadata: {
        options: currentState.input.options.map(({ id, label }) => ({
          label: interpolate(label, variables),
          value: id.source,
        })),
      },
      sentAt: new Date(),
    });

    return {
      handleNextUserInput: (input) => {
        let selectedOption = input?.inputMetadata?.selectedOption ??
          currentState.input.options.find(
            ({ label }) => label === input?.content
          )?.id?.source ??
          currentState.input.defaultOption.id.source;

        variables[currentState.input.defaultOption.variableName] =
          selectedOption;

        const selectedOutput = currentState.outputs[selectedOption];

        return { nextStatus: "processed", selectedOutput };
      },
      nextStatus: "waiting_input",
    };
  }

}
