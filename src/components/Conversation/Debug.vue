<script setup lang="ts">
import { Chat } from "../../store/modules/chat";
import NodeIcon from "../NodeIcon.vue";
import ConversationStatusIcon from "../ConversationStatusIcon.vue";
import { computed } from "vue";
import { Journey } from "../../domain/Journey/Journey";
import { Engine } from "../../domain/Conversation/Engine";

const { currentState, currentStatus } = defineProps<Partial<Chat.Debug>>();

const stepLabel = computed(() => {
  if (!currentState) return "Raiz";

  const stepLabels: Record<Journey.StepType, string> = {
    root: "Raíz",
    message: "Mensagem",
    redirect: "Redirecionamento",
    declaration: "Declaração",
    decision: "Decisão",
    integration: "Integração",
    "text-input": "Entrada de Texto",
    selection: "Seleção",
  };

  return stepLabels[currentState.input.step];
});

const statusLabel = computed(() => {
  if (!currentStatus) return "Não iniciado";

  const statusLabels: Record<Engine.ConversationStatus, string> = {
    not_ready: "Não iniciado",
    initializing: "Inicializando",
    waiting_input: "Aguardando input",
    sending_message: "Enviando mensagem",
    processing: "Processando",
    processed: "Processo concluído",
    failed: "Erro",
    completed: "Finalizado",
  };

  return statusLabels[currentStatus];
});
</script>

<template>
  <div class="debug">
    <div
      class="debug-step"
      :style="{
        borderColor: `var(--${currentState?.input?.step ?? 'root'}-node-color)`,
        color: `var(--${currentState?.input?.step ?? 'root'}-node-color)`,
      }"
    >
      <NodeIcon :type="currentState?.input?.step ?? 'root'" />
      {{ stepLabel }}
    </div>
    <div
      class="debug-status"
      :style="{
        borderColor: `var(--${currentStatus ?? 'not_ready'}-status-color)`,
        backgroundColor: `var(--${currentStatus ?? 'not_ready'}-status-color)`,
      }"
    >
      <ConversationStatusIcon :status="currentStatus ?? 'not_ready'" />
      {{ statusLabel }}
    </div>
  </div>
</template>

<style scoped>
.debug,
.debug > * {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: small;
}

.debug > * {
  padding: 2px 4px;
  border-radius: 4px;
}

.debug-step,
.debug-status {
  border: 1px solid;
  color: white;
}

svg {
  height: 12px;
  width: 12px;
}
</style>