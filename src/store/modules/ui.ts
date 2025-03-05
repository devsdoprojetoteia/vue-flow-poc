import type { State } from "../store";

export interface UIState {
  editingDrawerOpen: boolean;
  conversationModalOpen: boolean;
}

const initialize = (): UIState => ({
  editingDrawerOpen: false,
  conversationModalOpen: false,
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
    openModal(state: State) {
      state.ui.conversationModalOpen = true;
    },
    closeModal(state: State) {
      state.ui.conversationModalOpen = false;
    }
  },
  actions: {
  }
};
