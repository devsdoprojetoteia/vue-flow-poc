import { useVueFlow } from "@vue-flow/core";
import { computed } from "vue";
import { useStore } from "vuex";
import type { State } from "../store/store";
import UUID from "../utils/UUID";
import EmulatedEngine, { type Engine } from "../domain/Conversation/Engine";
import type { Chat } from "../store/modules/chat";

let engine: EmulatedEngine | undefined = undefined;
let delayedActions: (() => void)[] = [];

export default function useConversationEngine() {
  const store = useStore<State>();
  const { nodes, edges } = useVueFlow();

  const isDeploying = computed(() => store.state.chat.deploying);
  const isChatting = computed(() => store.state.ui.conversationModalOpen);
  const messages = computed(() => store.state.chat.messages);
  const debug = computed(() => store.state.chat.debug);

  setInterval(() => {
    delayedActions.shift()?.();
  }, 1000);

  const onStatusChange: Engine.OnStatusChangeCallback = (newStatus) => {
    delayedActions.push(() => store.commit("debugStatusChanged", newStatus));
  }

  const onStateUpdate: Engine.OnStateUpdateCallback = (newStatate) => {
    delayedActions.push(() => store.commit("debugStateChanged", newStatate));
  }

  const onFail: Engine.OnFailCallback = (failure) => {
    delayedActions.push(() => {
      store.commit("debugFailed", failure);
      sendBotMessage(
        {
          id: UUID.random(),
          content: failure.message,
          sentAt: new Date(),
        },
        "error",
      )
    });
  }

  function sendBotMessage(
    message: Engine.ChatIO,
    type: Chat.Message.Type = "incomming"
  ) {
    delayedActions.push(() => store.commit("sendMessage", { ...message, type }));
  }

  async function deploy() {
    store.commit("deployStarted");
    store.commit("openModal");
    engine = EmulatedEngine.create(
      nodes.value,
      edges.value,
      sendBotMessage,
      onStatusChange,
      onStateUpdate,
      onFail,
    );
    engine.start();
    setTimeout(() => store.commit("deployFinished"), 1000);
  }

  function cancel() {
    store.commit("clearMessages");
    store.commit("resetChat");
    engine = undefined;
    store.commit("closeModal");
  }

  function sendMessage({ content }: { content: string }) {
    if (!content) return;

    const userInput: Chat.Message = {
      id: UUID.random(),
      content: content,
      type: "outgoing",
      sentAt: new Date(),
    };

    store.commit("sendMessage", userInput);

    console.log({ engine, userInput });
    engine?.next(userInput);
  }

  function clearMessages() {
    store.commit("clearMessages");
    store.commit("resetChat");
    engine = EmulatedEngine.create(
      nodes.value,
      edges.value,
      sendBotMessage,
      onStatusChange,
      onStateUpdate,
      onFail,
    );
    engine.start();
  }

  return {
    isDeploying,
    isChatting,
    deploy,
    cancel,
    messages,
    sendMessage,
    clearMessages,
    debug,
  };
}
