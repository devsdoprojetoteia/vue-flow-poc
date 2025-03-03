import { useVueFlow } from "@vue-flow/core";
import { useStore } from "vuex";
import type { Journey } from "../domain/Journey/Journey";
import { computed } from "vue";
import type { State } from "../store/store";
import useJourneySync from "./useJourneySync";
import ftob from "../utils/ftob";

export default function useNodeEditor() {
  const { nodes, updateNode, edges, removeEdges } = useVueFlow();
  const { save } = useJourneySync();
  const store = useStore<State>();

  const isEditing = computed(() => store.state.ui.editingDrawerOpen);
  const nodeData = computed({
    get: () => store.state.journey.editingStep,
    set: (value: any) => store.commit("editStarted", value),
  });

  function edit(initialState: Journey.Step) {
    store.commit("openDrawer");
    store.commit("editStarted", { ...initialState });
  }

  async function apply(changes: Journey.Step) {
    const nodeId = (nodeData.value.id ?? changes.id).source;
    const currentData = nodes.value.find(({ id }) => id == nodeId)?.data;

    store.commit("closeDrawer");
    store.commit("editFinished");

    let updatedData: any = changes;

    if (
      currentData.step === "message" &&
      (changes as Journey.Message).type === "image"
    ) {
      updatedData = {
        ...currentData,
        ...updatedData,
        b64: await ftob(changes),
      };
    }

    if (currentData.step === "decision") {
      const currentDecision = currentData as Journey.Decision;
      const updatedDecision = changes as Journey.Decision;

      console.log({ currentDecision, updatedDecision });

      const absentExpressions = currentDecision.expressions.filter(({ id }) => {
        return !updatedDecision.expressions.find(({ id: newId }) => {
          return id.source === newId.source
        });
      });
      const unnecessaryEdges = edges.value.filter(({ sourceHandle }) => {
        return !!absentExpressions.find(({ id }) => sourceHandle === id.source);
      })

      removeEdges(unnecessaryEdges);
    }

    updateNode(nodeId, { data: { ...updatedData } });
    save();
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
