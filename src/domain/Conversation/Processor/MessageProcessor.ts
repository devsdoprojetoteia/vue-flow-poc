import interpolate from "../../../utils/interpolate";
import UUID from "../../../utils/UUID";
import type { Journey } from "../../Journey/Journey";
import { type Engine } from "../Engine";

export class MessageProcessor implements Engine.StepProcessor {

  process({
    variables,
    currentState,
    sendMessage,
  }: Engine.ProcessingInput<Journey.Message>): Engine.ProcessedInput {
    console.log("processing::message", { currentState, variables });

    sendMessage({
      id: UUID.random(),
      contentType: currentState.input.type,
      content: interpolate(currentState.input.content, variables),
      b64: currentState.input.b64,
      sentAt: new Date(),
    });

    return {
      nextStatus: "processed",
      selectedOutput: currentState.outputs[currentState.input.id.source],
    };
  }

}
