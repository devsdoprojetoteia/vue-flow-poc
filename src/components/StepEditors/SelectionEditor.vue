<script setup lang="ts">
import { computed } from "vue";
import operatorLabels, {
  unaryOperators,
} from "../../utils/labels/operatorLabels";
import UUID from "../../utils/UUID";

const operatorOptions = computed(() =>
  Object.entries(operatorLabels).map(([value, label]) => ({ label, value }))
);
</script>

<template>
  <FormKit
    name="title"
    type="text"
    label="Título"
    help="Observação do editor (o chatbot não enviará como mensagem)."
    validation="required"
  />
  <FormKit
    name="options"
    type="list"
    dynamic
    #default="{ items, node, value }"
    validation="required"
  >
    <h5>Opções</h5>
    <FormKit
      type="group"
      v-for="(item, index) in items"
      :key="item"
      :index="index"
    >
      <div class="group">
        <FormKit name="id" type="group">
          <FormKit name="source" type="hidden" validation="required" />
        </FormKit>

        <FormKit name="label" type="textarea" validation="required" />

        <svg
          class="delete"
          @click="() => node.input(value.filter((_, i) => i !== index))"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>trash-can</title>
          <path
            d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
          />
        </svg>
      </div>
    </FormKit>

    <div class="group-action">
      <button
        type="button"
        class="add"
        @click="() => node.input(value.concat({ id: UUID.random() }))"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>form-select</title>
          <path
            d="M15 5H18L16.5 7L15 5M5 2H19C20.11 2 21 2.9 21 4V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V4C3 2.9 3.9 2 5 2M5 4V8H19V4H5M5 20H19V10H5V20M7 12H17V14H7V12M7 16H17V18H7V16Z"
          />
        </svg>
        Adicionar opção
      </button>
    </div>
  </FormKit>

  <FormKit name="defaultOption" type="group">
    <FormKit
      name="variableName"
      type="text"
      label="Variável de retorno da resposta imprevista"
      help="Nome da variável na qual será salva a resposta."
      validation="required"
    />
  </FormKit>
</template>

<style scoped>
.group {
  display: flex;
  align-items: start;
  justify-content: space-around;
  border: 2px solid var(--selection-node-color);
  background: rgb(from var(--selection-node-color) r g b / 5%);
  border-radius: 16px;
  margin-bottom: 4px;
  padding: 8px 4px;
}

.group > .formkit-outer {
  margin: 0 4px;
  flex: 1;
}

svg {
  height: 24px;
}

svg.delete {
  margin: auto;
  padding: 4px 12px;
  fill: red;
  cursor: pointer;
}

svg.delete:hover {
  opacity: 0.5;
}

.group-action {
  display: flex;
  justify-content: end;
  margin-bottom: 16px;
}

button.add {
  background: var(--selection-node-color);
  border: none;
  color: white;
  fill: white;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

button.add:hover {
  opacity: 0.8;
}

button.add > svg {
  margin-right: 4px;
}
</style>