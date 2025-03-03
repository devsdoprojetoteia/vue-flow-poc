import UUID from "../../utils/UUID"
import type { Journey } from "./Journey"

const journeyStepFactory: Journey.StepFactory = {
  message() {
    return {
      id: UUID.random(),
      step: "message",
      type: "text",
      content: "Hello, {{ world }}!",
    }
  },
  redirect() {
    return {
      id: UUID.random(),
      step: "redirect",
      title: "Jornada Teste",
      targetJourneyId: UUID.random(),
    }
  },
  declaration() {
    return {
      id: UUID.random(),
      step: "declaration",
      variable: {
        name: "foo",
        type: "string",
        value: "bar"
      }
    }
  },
  decision() {
    return {
      id: UUID.random(),
      step: "decision",
      title: "Exemplo de seleção:",
      default: UUID.random(),
      expressions: [
        {
          id: UUID.random(),
          expression: {
            left: "{{ variavel }}", 
            operator: "eq", 
            right: "true"
          }
        },
        {
          id: UUID.random(),
          expression: {
            left: "{{ variavel }}", 
            operator: "eq", 
            right: "false"
          }
        },
      ]
    }
  },
  integration() {
    return {
      id: UUID.random(),
      step: "integration",
      variableName: "resposta",
      request: {
        url: "https://example.com",
      }
    }
  },
  textInput() {
    return {
      id: UUID.random(),
      step: "text-input",
      variableName: "resposta"
    }
  },
  selection() {
    return {
      id: UUID.random(),
      step: "selection",
      title: "Exemplo de seleção:",
      options: [
        { id: UUID.random(), label: "Sim 👍" },
        { id: UUID.random(), label: "Não 👎" }
      ],
      defaultOption: { id: UUID.random(), variableName: "respostaImprevista" },
    }
  }
}

export default journeyStepFactory;
