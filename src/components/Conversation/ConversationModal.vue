<script setup lang="ts">
import { onMounted, onUpdated, ref } from "vue";
import useConversationEngine from "../../composables/useConversationEngine";
import { Chat } from "../../store/modules/chat";
import Ballon from "./Ballon.vue";
import Debug from "./Debug.vue";

const { isDeploying, cancel, messages, sendMessage, clearMessages, debug } =
  useConversationEngine();

const scrollZone = ref<HTMLElement>();
let autoScroll = true;

function hangleOptionSelection(value: string, label?: string) {
  sendMessage({
    content: label,
    inputMetadata: { selectedOption: value },
  });
  setTimeout(scrollToBottom);
}

function handleSubmit(data: Pick<Chat.Message, "content">, { reset }: any) {
  sendMessage(data);
  setTimeout(scrollToBottom);
  reset();
}

function scrollToBottom() {
  if (!scrollZone.value || !autoScroll) return;

  scrollZone.value.scrollTo({
    top: scrollZone.value.scrollHeight,
    behavior: "smooth",
  });
}

const checkScrollPosition = () => {
  if (!scrollZone.value) return;

  const threshold = 100;
  const { scrollTop, scrollHeight, clientHeight } = scrollZone.value;

  autoScroll = scrollHeight - (scrollTop + clientHeight) < threshold;
};

onMounted(() => {
  scrollToBottom();
  scrollZone.value?.addEventListener("scroll", checkScrollPosition);
});

onUpdated(() => {
  scrollToBottom();
})
</script>

<template>
  <div class="background" @click="cancel"></div>
  <article class="modal">
    <section class="modal-header">
      <h2>Teste de conversação <Debug v-bind="debug" /></h2>

      <svg
        class="modal-close-button"
        @click="cancel"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <title>close</title>
        <path
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
        />
      </svg>
    </section>

    <section class="modal-content" ref="scrollZone">
      <div class="deploying" v-if="isDeploying">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>loading</title>
          <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg>
        <span> Carregando... </span>
      </div>

      <div class="chat" v-else-if="messages.length > 0">
        <Ballon
          v-for="message in messages"
          :key="message.id.source"
          v-bind="message"
          @select-option="hangleOptionSelection"
        />
      </div>

      <div class="no-messages" v-else>Diga um oi</div>
    </section>

    <section class="modal-footer">
      <button
        class="secondary"
        type="button"
        @click="clearMessages"
        title="Limpar mensagens"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z"
          />
        </svg>
      </button>
      <FormKit
        :classes="{
          form: '$reset send-message-form',
        }"
        :actions="false"
        type="form"
        submit-label=">"
        @submit="handleSubmit"
      >
        <FormKit
          :classes="{
            outer: '$reset send-message-input',
          }"
          name="content"
          type="text"
          placeholder="Digite uma mensagem"
        />

        <button class="primary" type="submit" title="Enviar mensagem">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
          </svg>
        </button>
      </FormKit>
    </section>
  </article>
</template>

<style scoped>
svg {
  height: 16px;
}

button {
  border: 1px solid dodgerblue;
  padding: 13px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

button.primary {
  background-color: dodgerblue;
  color: lightcyan;
  fill: currentColor;
}

button.primary:hover {
  background: rgb(from dodgerblue r g b / 90%);
}

button.primary:active {
  background: rgb(22, 107, 192);
  color: lightcyan;
}

button.secondary {
  background-color: lightcyan;
  color: dodgerblue;
  fill: currentColor;
}

button.secondary:hover {
  opacity: 0.8;
}

button.secondary:active {
  background-color: dodgerblue;
  color: lightcyan;
}

.background {
  height: 100%;
  width: 100%;
  background: var(--default-dark-color);
  position: absolute;
  top: 0;
  left: 0;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  min-width: 300px;
  background: white;
  display: block;
  border-radius: 8px;
}

.modal > * {
  padding: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
}

.modal-header > svg:hover {
  cursor: pointer;
  opacity: 0.5;
}

.modal-header > h2 {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: medium;
  margin: 0;
}

.modal-content {
  height: calc(100vh - 300px);
  max-height: calc(100vh - 300px);
  overflow-y: scroll;
}

.deploying {
  display: flex;
  align-items: center;
}

.deploying > * {
  margin: 0 4px;
}

.deploying > svg {
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}

.chat {
  display: flex;
  flex-direction: column;
}

.modal-footer {
  border-top: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.send-message-form {
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 16px;
}

.send-message-form > * {
  margin-left: 16px;
}

.send-message-input {
  margin: 0;
  flex: 1;
}

.no-messages {
  font-size: small !important;
  background: lightgray;
  color: gray;
  width: fit-content;
  padding: 8px 16px;
  margin: 0 auto;
  border-radius: 24px;
  font-size: 16px;
}
</style>