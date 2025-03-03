import { Node, useVueFlow } from '@vue-flow/core';
import { useStore } from 'vuex';
import { type State } from '../store/store';
import { computed } from 'vue';
import type { Journey } from '../domain/Journey/Journey';

export default function useDragAndDrop() {
  const store = useStore<State>();

  const {
    addNodes,
    screenToFlowCoordinate,
    onNodesInitialized,
    updateNode,
    toObject,
  } = useVueFlow();

  const isDragging = computed(() => store.state.dnd.isDragging);

  store.watch(
    (state) => {
      return state.dnd.isDragging
    },
    (newValue) => {
      document.body.style.userSelect = newValue ? 'none' : '';
      return newValue;
    }
  );

  function onDragStart(event: any, payload: any = {}) {
    if (event.dataTransfer) {
      console.log({ payload });
      event.dataTransfer.setData('application/vueflow', payload.step);
      event.dataTransfer.setData('payload', JSON.stringify(payload));
      event.dataTransfer.effectAllowed = 'move';
    }

    store.commit("dragStarted", { draggedType: payload.step, isDragging: true });
    document.addEventListener('drop', onDragEnd);
  }

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  function onDragOver(event: any) {
    event.preventDefault();

    const { draggedType } = store.state.dnd;

    if (draggedType) {
      store.commit("dragOver");

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    }
  }

  function onDragLeave() {
    const stage = "dragLeave";
    store.commit(stage);
  }

  function onDragEnd() {
    const stage = "dragEnded";
    store.commit(stage);
    document.removeEventListener('drop', onDragEnd);
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  function onDrop(event: DragEvent) {
    const payload = event.dataTransfer?.getData("payload") ?? "{}";
    const position = screenToFlowCoordinate({
      x: event.clientX,
      y: event.clientY,
    });

    const data: Journey.Step = JSON.parse(payload);
    const nodeId = data.id.source;

    const newNode: Node = {
      id: nodeId,
      type: store.state.dnd.draggedType ?? "default",
      position,
      data,
    };

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 },
      }));

      off();
    })

    addNodes(newNode);

    localStorage.setItem("diagram", JSON.stringify(toObject()));
  }

  return {
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
    isDragging,
  }
}
