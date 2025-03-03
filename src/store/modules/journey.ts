import type { Journey } from "../../domain/Journey/Journey";
import type { State } from "../store";

export interface JourneyState {
  editingStep: Partial<Journey.Step>;
  synchronizing: boolean;
}

const initialize = (): JourneyState => ({
  editingStep: {},
  synchronizing: false,
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
    },
    synchronizationStarted(state: State) {
      state.journey.synchronizing = true;
    },
    synchronizationFinished(state: State) {
      state.journey.synchronizing = false;
    },
  },
  actions: {
  }
};
