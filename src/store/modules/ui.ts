import type { State } from "../store";

export interface UIState {
  editingDrawerOpen: boolean;
}

const initialize = (): UIState => ({
  editingDrawerOpen: false,
});

export default {
  state: initialize(),
  getters: {
  },
  mutations: {
    openDrawer(state: State) {
      state.ui.editingDrawerOpen = true;
    },
    closeDrawer(state: State) {
      state.ui.editingDrawerOpen = false;
    },
  },
  actions: {
  }
};
