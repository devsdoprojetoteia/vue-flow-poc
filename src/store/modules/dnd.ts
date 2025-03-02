import { mode, type State } from "../store";

export interface DndState {
  draggedType: string | null;
  isDragOver: boolean;
  isDragging: boolean;
};

const initialize = (): DndState => ({
  draggedType: null,
  isDragOver: false,
  isDragging: false,
});

export type DragStartedPayload = Pick<DndState, "draggedType" | "isDragging">;

export default {
  state: initialize(),
  getters: {
    isDragging(state: State): boolean {
      return state.dnd.isDragging;
    }
  },
  mutations: {
    dragStarted(state: State, payload: DragStartedPayload) {
      if (mode == "debug") console.log("start", { dnd: state.dnd });
      state.dnd.draggedType = payload.draggedType;
      state.dnd.isDragging = payload.isDragging;
    },
    dragOver(state: State) {
      if (mode == "debug") console.log("over", { dnd: state.dnd });
      state.dnd.isDragOver = true;
    },
    dragLeave(state: State) {
      if (mode == "debug") console.log("leave", { dnd: state.dnd });
      state.dnd.isDragOver = false;
    },
    dragEnded(state: State) {
      console.log("end", { dnd: state.dnd });
      state.dnd = initialize();
    }
  },
  actions: {
  }
}
