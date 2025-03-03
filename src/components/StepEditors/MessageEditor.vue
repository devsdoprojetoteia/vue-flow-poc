<script setup lang="ts">
import { computed, ref, watch } from "vue";
import messageTypeLabels from "../../utils/labels/messageTypeLabels";
import { Journey } from "../../domain/Journey/Journey";

export type MessageEditorProps = Partial<Journey.Message>;

const { type } = defineProps<MessageEditorProps>();

const messageTypeOptions = computed(() =>
  Object.entries(messageTypeLabels).map(([value, label]) => ({ label, value }))
);
</script>

<template>
  <FormKit
    name="type"
    type="radio"
    :options="messageTypeOptions"
    label="Tipo"
    help="Selecione o tipo de mensagem desejado"
    validation="required"
  />
  <FormKit
    v-if="type === 'text'"
    name="content"
    type="textarea"
    label="Conteúdo"
    help="💡 Este campo aceita interpolação de variáveis. Ex.: {{ variavel }}."
    validation="required"
  />
  <FormKit
    v-if="type == 'image'"
    name="content"
    type="file"
    label="Arquivo"
    accept=".png,.jpeg,.jpg"
    help="Selecione uma imagem para ser enviada."
    multiple="false"
    validation="required"
  />
  <FormKit
    v-if="type == 'video'"
    name="content"
    type="file"
    label="Arquivo"
    accept=".mp4"
    help="Selecione um vídeo para ser enviado."
    multiple="false"
    validation="required"
  />
</template>