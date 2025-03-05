import { createStore } from "vuex";
import dnd, { type DndState } from "./modules/dnd";
import journey, { type JourneyState } from "./modules/journey";
import ui, { type UIState } from "./modules/ui";
import type { ChatState } from "./modules/chat";
import chat from "./modules/chat";

export interface State {
  chat: ChatState,
  dnd: DndState,
  journey: JourneyState,
  ui: UIState,
}

const initialize = (): State => ({
  chat: chat.state,
  dnd: dnd.state,
  journey: journey.state,
  ui: ui.state,
});

export let mode = "prod" as "debug" | "prod";
// mode = "debug";

export default createStore<State>({
  state: initialize(),
  getters: {
    ...chat.getters,
    ...dnd.getters,
    ...journey.getters,
    ...ui.getters,
  },
  mutations: {
    ...chat.mutations,
    ...dnd.mutations,
    ...journey.mutations,
    ...ui.mutations,
  },
  actions: {
    ...chat.actions,
    ...dnd.actions,
    ...journey.actions,
    ...ui.actions,
  }
});
