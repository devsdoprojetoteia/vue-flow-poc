import type { Engine } from "../../domain/Conversation/Engine";
import type { State } from "../store";

export namespace Chat {

  export type Message = Engine.ChatIO & { type: Message.Type };

  export namespace Message {

    export type Type = "outgoing" | "incoming" | "error";

  }

  export interface Debug {
    currentState: Engine.ConversationTracking;
    currentStatus: Engine.ConversationStatus;
    failure: any;
  }

}

export interface ChatState {
  deploying: boolean;
  messages: Chat.Message[];
  debug: Partial<Chat.Debug>;
}

const initialize = (): ChatState => ({
  deploying: false,
  messages: [],
  debug: {},
});

export default {
  state: initialize(),
  getters: {
  },
  mutations: {
    deployStarted(state: State) {
      state.chat.deploying = true;
    },
    deployFinished(state: State) {
      state.chat.deploying = false;
    },
    clearMessages(state: State) {
      state.chat.messages = [];
    },
    sendMessage(state: State, message: Chat.Message) {
      state.chat.messages.push(message);
    },
    debugStatusChanged(state: State, newStatus: Engine.ConversationStatus) {
      state.chat.debug = { ...state.chat.debug, currentStatus: newStatus };
    },
    debugStateChanged(state: State, newState: Engine.ConversationTracking) {
      state.chat.debug = { ...state.chat.debug, currentState: newState };
    },
    debugFailed(state: State, failure: any) {
      state.chat.debug = { ...state.chat.debug, failure };
    },
    resetChat(state: State) {
      state.chat = initialize();
    },
  },
  actions: {
  }
};
