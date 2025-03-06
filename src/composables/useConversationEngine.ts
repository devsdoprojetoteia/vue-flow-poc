import { useVueFlow } from "@vue-flow/core";
import { computed } from "vue";
import { useStore } from "vuex";
import type { State } from "../store/store";
import UUID from "../utils/UUID";
import EmulatedEngine, { type Engine } from "../domain/Conversation/Engine";
import type { Chat } from "../store/modules/chat";

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
    type: Chat.Message.Type = "incoming"
  ) {
    delayedActions.push(() => store.commit("sendMessage", { ...message, type }));
  }

  async function deploy() {
    store.commit("openModal");

    if (!window.emulatedEngine) {
      store.commit("deployStarted");

      window.emulatedEngine = EmulatedEngine.create(
        nodes.value,
        edges.value,
        sendBotMessage,
        onStatusChange,
        onStateUpdate,
        onFail,
      );
      window.emulatedEngine.start();

      setTimeout(() => store.commit("deployFinished"), 1000);
    }
  }

  function cancel() {
    store.commit("closeModal");
  }

  function sendMessage(
    { content, inputMetadata }: Pick<Chat.Message, "content" | "inputMetadata">,
  ) {
    if (!content) return;

    const userInput: Chat.Message = {
      id: UUID.random(),
      content: content.trim(),
      inputMetadata,
      type: "outgoing",
      sentAt: new Date(),
    };

    store.commit("sendMessage", userInput);

    window.emulatedEngine?.next(userInput);
  }

  function clearMessages() {
    store.commit("clearMessages");
    store.commit("resetChat");
    window.emulatedEngine = EmulatedEngine.create(
      nodes.value,
      edges.value,
      sendBotMessage,
      onStatusChange,
      onStateUpdate,
      onFail,
    );
    window.emulatedEngine.start();
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
