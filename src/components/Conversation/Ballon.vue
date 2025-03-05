<script setup lang="ts">
import { computed } from "vue";
import { Chat } from "../../store/modules/chat";
import NodeIcon from "../NodeIcon.vue";
import ConversationStatusIcon from "../ConversationStatusIcon.vue";

const message = defineProps<Chat.Message>();
const formattedSentAt = computed(() => message.sentAt.toLocaleTimeString());
</script>

<template>
  <div :class="`message ${message.type}`">
    <div
      class="bot"
      v-if="message.type === 'incomming' || message.type === 'error'"
    >
      <NodeIcon v-if="message.type === 'incomming'" type="root" />
      <ConversationStatusIcon v-else status="failed" />
      TeiaBot
    </div>
    <code v-if="message.type === 'error'">{{ message.content }}</code>
    <p v-else>{{ message.content }}</p>
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

.message > p,
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

.incomming.message {
  border-top-left-radius: 0;
  text-align: left;
  margin-right: 15%;
  border: 1px solid dodgerblue;
  background: lightcyan;
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