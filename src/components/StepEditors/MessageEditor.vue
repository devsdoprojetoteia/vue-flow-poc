<script setup lang="ts">
import { computed } from "vue";
import messageTypeLabels from "../../utils/labels/messageTypeLabels";
import { Journey } from "../../domain/Journey/Journey";
import useNodeEditor from "../../composables/useNodeEditor";

const { apply, nodeData } = useNodeEditor();

const messageTypeOptions = computed(() =>
  Object.entries(messageTypeLabels).map(([value, label]) => ({ label, value }))
);
</script>

<template>
  <FormKit type="form" submit-label="Salvar" :value="nodeData" @submit="apply">
    <FormKit
      type="radio"
      :options="messageTypeOptions"
      label="Tipo"
      name="type"
      help="Selecione o tipo de mensagem desejado"
      validation="required"
    />
    <FormKit
      type="textarea"
      label="Conteúdo"
      name="content"
      help="💡 Este campo aceita interpolação de variáveis"
      validation="required"
    />
  </FormKit>
</template>