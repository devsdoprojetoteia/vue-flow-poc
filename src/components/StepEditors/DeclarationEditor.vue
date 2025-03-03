<script setup lang="ts">
import { computed } from "vue";
import variableTypeLabels from "../../utils/labels/variableTypeLabels";

const variableTypeOptions = computed(() =>
  Object.entries(variableTypeLabels).map(([value, label]) => ({ label, value }))
);
</script>

<template>
  <FormKit name="variable" type="group">
    <FormKit
      name="name"
      type="text"
      label="Nome"
      help="Essa é a forma como você vai chamar sua variável."
      validation="required"
    />
    <FormKit
      name="type"
      type="radio"
      :options="variableTypeOptions"
      label="Tipo"
      help="Selecione o tipo da variável."
      validation="required"
    />
    <FormKit
      name="value"
      type="text"
      label="Valor"
      help="O valor inicial, podendo ser alterado."
      validation="required"
    />
  </FormKit>
</template>