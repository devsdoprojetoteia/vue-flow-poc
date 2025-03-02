import { createStore } from "vuex";

export const dndInitialState = {
  draggedType: null as string | null,
  isDragOver: false,
  isDragging: false,
};

export type DndState = typeof dndInitialState;

export type DragStartedPayload = Pick<DndState, "draggedType" | "isDragging">;

export const initialState = { dnd: dndInitialState };

export type State = typeof initialState;

let mode = "prod" as "debug" | "prod";
// mode = "debug";

export default createStore<State>({
  state: initialState,
  getters: {
    isDragging(state): boolean {
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
      if (mode == "debug") console.log("end", { dnd: state.dnd });
      state.dnd = dndInitialState;
    }
  },
  actions: {
  }
});
