<script setup lang="ts">
import { computed } from "vue";
import { Chat } from "../../store/modules/chat";
import NodeIcon from "../NodeIcon.vue";
import ConversationStatusIcon from "../ConversationStatusIcon.vue";
import useConversationEngine from "../../composables/useConversationEngine";
import Markdown from "../Markdown.vue";

export type BallonEvents = {
  selectOption: [value: string, label?: string];
};

const { messages } = useConversationEngine();

const message = defineProps<Chat.Message>();
const content = computed(() => message.content);
const b64 = computed(() => message.b64);
const options = computed(() => message.outputMetadata?.options);
const emit = defineEmits<BallonEvents>();

const formattedSentAt = computed(() => message.sentAt.toLocaleTimeString());

function handleOptionClick(value: string, label?: string) {
  emit("selectOption", value, label);
}
</script>

<template>
  <div :class="`message ${message.type}`">
    <div
      class="bot"
      v-if="message.type === 'incoming' || message.type === 'error'"
    >
      <NodeIcon v-if="message.type === 'incoming'" type="root" />
      <ConversationStatusIcon v-else status="failed" />
      TeiaBot
    </div>
    <code v-if="message.type === 'error'" v-html="content" />
    <Markdown v-else :content="content" />
    <img v-if="b64 && message.contentType === 'image'" :src="b64" />
    <video v-if="b64 && message.contentType === 'video'" controls />
    <div class="options-wrapper" v-if="!!options && options.length > 0">
      <button
        class="option"
        @click="() => handleOptionClick(option.value, option.label)"
        :disabled="messages[messages.length - 1].id !== message.id"
        v-for="option in options"
        :key="option.value"
      >
        <Markdown :content="option.label" />
      </button>
    </div>
    <div class="sent-at">
      <small>{{ formattedSentAt }}</small>
    </div>
  </div>
</template>

<style scoped>
.message {
  padding: 0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  width: fit-content;
  min-width: 15%;
}

.message > .markdown,
.message > code {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 0;
}

.message > code {
  display: flex;
  font-size: small;
  font-weight: bold;
}

.message > * {
  padding: 0.2rem 0.3rem;
  max-width: calc(100% - 0.6rem);
}

.message > .bot {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: dodgerblue;
}

.message > .bot > svg {
  width: 12px !important;
  height: 12px !important;
  padding: 4px;
  margin-right: 6px;
  background: dodgerblue;
  fill: white !important;
  border-radius: 100%;
}

.incoming.message {
  border-top-left-radius: 0;
  text-align: left;
  margin-right: 15%;
  border: 1px solid dodgerblue;
  background: lightcyan;
}

.options-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 4px;
}

.options-wrapper > button.option {
  width: fit-content;
  padding: 4px 8px;
  margin: 0 8px;
  border-radius: 4px;
  border: none;
}

button.option {
  background: dodgerblue;
  color: white;
  cursor: pointer;
}

button.option:hover {
  opacity: 0.8;
}

button.option:active {
  opacity: 1;
  background: rgb(22, 107, 192);
}

button.option:disabled {
  opacity: 1 !important;
  cursor: not-allowed;
  color: grey;
  background: lightgray;
}

.error.message {
  border-top-left-radius: 0;
  text-align: left;
  margin-right: 15%;
  border: 1px solid red;
  background: lightpink;
}

.error > .bot {
  color: red;
}

.error > .bot > svg {
  background: red;
}

.outgoing.message {
  border-bottom-right-radius: 0;
  margin-left: 15%;
  border: 1px solid dodgerblue;
  background: dodgerblue;
  color: lightcyan;
  align-self: flex-end;
}

.sent-at {
  padding-top: 0;
  font-size: x-small;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>