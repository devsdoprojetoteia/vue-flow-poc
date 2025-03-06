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
  />
  <FormKit
    name="expressions"
    type="list"
    dynamic
    #default="{ items, node, value }"
    validation="required"
  >
    <h5>Expressões</h5>
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

        <FormKit name="expression" type="group">
          <FormKit name="left" type="text" validation="required" />
          <FormKit name="operator" type="select" :options="operatorOptions" />
          <FormKit
            v-if="!unaryOperators[value[index].expression.operator]"
            name="right"
            type="text"
          />
          <FormKit v-else type="text" disabled />
        </FormKit>

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
          <title>timeline-check</title>
          <path
            d="M4 8H2V2H4V8M2 22H4V16H2V22M3 10C1.9 10 1 10.9 1 12C1 13.11 1.9 14 3 14C4.11 14 5 13.11 5 12C5 10.9 4.11 10 3 10M24 6V18C24 19.11 23.11 20 22 20H10C8.9 20 8 19.11 8 18V14L6 12L8 10V6C8 4.89 8.9 4 10 4H22C23.11 4 24 4.89 24 6M19.75 10.33L18.59 8.92L15 12.5L13.41 10.92L12.25 12.08L15 15.08L19.75 10.33Z"
          />
        </svg>
        Adicionar expressão
      </button>
    </div>
  </FormKit>
</template>

<style scoped>
.group {
  display: flex;
  align-items: start;
  justify-content: space-around;
  border: 2px solid var(--decision-node-color);
  background: rgb(from var(--decision-node-color) r g b / 5%);
  border-radius: 16px;
  margin-bottom: 4px;
  padding: 8px 4px;
}

.group > .formkit-outer {
  margin: 0 4px;
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
  background: var(--decision-node-color);
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