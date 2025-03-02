import UUID from "../../utils/UUID";
import type { Journey } from "../../@types/namespaces/Journey";

export const dndInitialState = {
  draggedType: null,
  isDragOver: false,
  isDragging: false,
};

export const selectedNodeDataInitialState: Journey.Step = {
  id: UUID.random(),
};

export const journeyStepFactory: Journey.StepFactory = {
  message(id: string) {
    return {
      id: new UUID(id),
      type: "text",
      content: "Hello, World!",
    }
  },
  redirect(id: string) {
    return {
      id: new UUID(id),
      title: "Título da Jornada",
      targetJourneyId: UUID.random(),
    }
  },
  declaration(id: string) {
    return {
      id: new UUID(id),
      variable: {
        name: "foo",
        type: "string" as "string" | "boolean" | "number" | "object" | "array",
        value: "bar"
      }
    }
  },
  decision(id: string) {
    return {
      id: new UUID(id),
      title: "Exemplo de seleção:",
      variableName: "gostaDeBanana",
      expressions: [
        {
          id: UUID.random(),
          expression: {
            left: "{{ gostaDeBanana }}", 
            operator: "eq", 
            right: "true"
          }
        },
        {
          id: UUID.random(),
          expression: {
            left: "{{ gostaDeBanana }}", 
            operator: "eq", 
            right: "false"
          }
        },
      ]
    }
  },
  integration(id: string) {
    return {
      id: new UUID(id),
      variableName: "resposta",
      request: {
        url: "https://example.com",
      }
    }
  },
  textInput(id: string) {
    return {
      id: new UUID(id),
      variableName: "oQueFoiDito"
    }
  },
  selection(id: string) {
    return {
      id: new UUID(id),
      title: "Exemplo de seleção:",
      options: [
        { id: UUID.random(), label: "Sim 👍" },
        { id: UUID.random(), label: "Não 👎" }
      ],
      defaultOption: { id: UUID.random(), variableName: "respostaImprevista" },
    }
  }
}

export default {
  state: {
    dnd: dndInitialState,
    selectedNodeData: selectedNodeDataInitialState,
  },
  getters: {
  },
  mutations: {
    initializeNodeData(state: Journey.Step) {
      state.id
    }
  },
  actions: {
  }
};
