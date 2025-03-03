<script setup lang="ts">
</script>

<template>
  <FormKit
    name="title"
    type="text"
    label="Título"
    help="Informe o título da jornada em texto simples."
    validation="required"
  />
  <FormKit name="targetJourneyId" type="group">
    <FormKit
      name="source"
      type="text"
      label="ID da jornada"
      help="Cole o ID da jornada para a qual a conversa deve ser redirecionada."
      validation="required"
    />
  </FormKit>
</template>