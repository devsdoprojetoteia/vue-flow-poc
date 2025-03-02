export const dndInitialState = {
  draggedType: null as string | null,
  isDragOver: false,
  isDragging: false,
};

export type DndState = typeof dndInitialState;

export type DragStartedPayload = Exclude<DndState, "isDragOver">

export default {
  state: {
    dnd: dndInitialState,
  },
  getters: {
  },
  mutations: {
    dragStarted(state: DndState, payload: DragStartedPayload) {
      state.draggedType = payload.draggedType;
      state.isDragging = payload.isDragging;
    }
  },
  actions: {
  }
};
