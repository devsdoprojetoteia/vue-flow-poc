import { useVueFlow } from "@vue-flow/core";
import { useStore } from "vuex";
import type { Journey } from "../domain/Journey/Journey";
import { computed } from "vue";
import type { State } from "../store/store";

export default function useNodeEditor() {
  const { updateNode } = useVueFlow();
  const store = useStore<State>();

  const isEditing = computed(() => store.state.ui.editingDrawerOpen);
  const nodeData = computed(() => store.state.journey.editingStep);

  function edit(initialState: Journey.Step) {
    store.commit("openDrawer");
    store.commit("editStarted", initialState);
  }

  function apply(changes: Journey.Step) {
    const nodeId = (nodeData.value.id ?? changes.id).source;
    console.log({ changes, current: nodeData.value, nodeId });
    store.commit("closeDrawer");
    store.commit("editFinished");
    updateNode(nodeId, { data: { ...changes } });
  }

  function cancel() {
    store.commit("closeDrawer");
    store.commit("editFinished");
  }

  return {
    isEditing,
    nodeData,
    edit,
    apply,
    cancel,
  }
}
