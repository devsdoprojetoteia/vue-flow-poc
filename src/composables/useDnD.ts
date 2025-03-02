import { Node, useVueFlow } from '@vue-flow/core';
import { ref, watch } from 'vue'
import UUID from '../utils/UUID'
import { useStore } from 'vuex';
import { type State } from '../store/store';

export default function useDragAndDrop() {
  const $store = useStore<State>();

  const {
    addNodes,
    screenToFlowCoordinate,
    onNodesInitialized,
    updateNode,
  } = useVueFlow();

  const isDragging = ref($store.state.dnd.isDragging);

  watch(isDragging, (state) => {
    console.log(state);
    document.body.style.userSelect = state ? 'none' : '';
  });

  function onDragStart(event: any, draggedType: any, payload: any = {}) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', draggedType);
      event.dataTransfer.setData('payload', JSON.stringify(payload));
      event.dataTransfer.effectAllowed = 'move';
    }

    const isDragging = true;

    $store.commit("dragStarted", { draggedType, isDragging });
    document.addEventListener('drop', onDragEnd);
  }

  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  function onDragOver(event: any) {
    event.preventDefault();

    const { draggedType } = $store.state.dnd;

    if (draggedType) {
      $store.commit("dragOver");

      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
      }
    }
  }

  function onDragLeave() {
    $store.commit("dragLeave");
  }

  function onDragEnd() {
    $store.commit("dragEnded");
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

    const nodeId = UUID.random().toString();

    const newNode: Node = {
      id: UUID.random().toString(),
      type: $store.state.dnd.draggedType ?? "default",
      position,
      data: JSON.parse(payload),
    }

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     * We can hook into events even in a callback, and we can remove the event listener after it's been called.
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: { x: node.position.x - node.dimensions.width / 2, y: node.position.y - node.dimensions.height / 2 },
      }))

      off()
    })

    addNodes(newNode)
  }

  return {
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
  }
}
