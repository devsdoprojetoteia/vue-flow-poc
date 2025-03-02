import type { Journey } from "../../domain/Journey/Journey";
import type { State } from "../store";

export interface JourneyState {
  editingStep: Partial<Journey.Step>;
}

const initialize = (): JourneyState => ({
  editingStep: {},
});

export default {
  state: initialize(),
  getters: {
  },
  mutations: {
    editStarted(state: State, step: Journey.Step) {
      state.journey.editingStep = step;
    },
    editFinished(state: State) {
      state.journey = initialize();
    }
  },
  actions: {
  }
};
