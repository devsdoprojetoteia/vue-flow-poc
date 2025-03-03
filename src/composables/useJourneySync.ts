import { useVueFlow } from "@vue-flow/core";
import type UUID from "../utils/UUID";
import { useStore } from "vuex";
import type { State } from "../store/store";
import { computed } from "vue";

export default function useJourneySync(currentJourneyId?: UUID) {
  const store = useStore<State>();
  const { fromObject, toObject, id } = useVueFlow();

  const journeyId = currentJourneyId?.source ?? id;

  const isSynchronizing = computed(() => store.state.journey.synchronizing);

  async function save() {
    store.commit("synchronizationStarted");
    localStorage.setItem(
      `journey::${journeyId}`,
      JSON.stringify(toObject()),
    );
    setTimeout(() => store.commit("synchronizationFinished"), 1000);
  }

  async function restore(data?: string) {
    store.commit("synchronizationStarted");
    const rawJourney = data ?? localStorage.getItem(`journey::${journeyId}`);
    if (!!rawJourney) fromObject(JSON.parse(rawJourney));
    setTimeout(() => store.commit("synchronizationFinished"), 1000);
  }

  return {
    isSynchronizing,
    save,
    restore,
  }
}