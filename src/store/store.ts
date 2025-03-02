import { createStore } from "vuex";
import dnd, { type DndState } from "./modules/dnd";
import journey, { type JourneyState } from "./modules/journey";
import ui, { type UIState } from "./modules/ui";

export interface State {
  dnd: DndState,
  journey: JourneyState,
  ui: UIState,
}

const initialize = (): State => ({
  dnd: dnd.state,
  journey: journey.state,
  ui: ui.state,
});

export let mode = "prod" as "debug" | "prod";
// mode = "debug";

export default createStore<State>({
  state: initialize(),
  getters: {
    ...dnd.getters,
    ...journey.getters,
    ...ui.getters,
  },
  mutations: {
    ...dnd.mutations,
    ...journey.mutations,
    ...ui.mutations,
  },
  actions: {
    ...dnd.actions,
    ...journey.actions,
    ...ui.actions,
  }
});
