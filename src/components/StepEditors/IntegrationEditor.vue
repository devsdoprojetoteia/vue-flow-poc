<script setup lang="ts">
import { computed } from "vue";
import requestMethodLabels from "../../utils/labels/requestMethodLabels";

const requestMethodOptions = computed(() =>
  Object.entries(requestMethodLabels).map(([value, label]) => ({
    label,
    value,
  }))
);
</script>

<template>
  <FormKit
    name="variableName"
    type="text"
    label="Variável de retorno"
    help="Nome da variável na qual será salva a resposta."
    validation="required"
  />
  <FormKit name="request" type="group">
    <FormKit
      name="url"
      type="text"
      label="URL"
      help="Endereço a ser invocado."
      validation="required"
    />
    <FormKit
      name="method"
      type="radio"
      :options="requestMethodOptions"
      label="Método HTTP"
      help="Selectione o método desejado."
    />

    <FormKit
      name="headers"
      type="list"
      dynamic
      #default="{ items, node, value }"
    >
      <h5>Cabeçalhos</h5>
      <FormKit
        type="group"
        v-for="(item, index) in items"
        :key="item"
        :index="index"
      >
        <div class="group">
          <FormKit name="name" type="text" label="Nome" validation="required" />
          <FormKit
            name="value"
            type="text"
            label="Valor"
            validation="required"
          />

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
          @click="() => node.input(value.concat({}))"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>format-list-group-plus</title>
            <path
              d="M17 14V17H14V19H17V22H19V19H22V17H19V14M20 11V12.3C19.4 12.1 18.7 12 18 12C16.8 12 15.6 12.4 14.7 13H7V11H20M12.1 17H7V15H12.8C12.5 15.6 12.2 16.3 12.1 17M7 7H20V9H7V7M5 19H7V21H3V3H7V5H5V19Z"
            />
          </svg>
          Adicionar cabeçalho
        </button>
      </div>
    </FormKit>
  </FormKit>
  <FormKit
    name="body"
    type="textarea"
    label="Corpo"
    help="💡 Este campo aceita interpolação de variáveis. Ex.: {{ variavel }}."
  />
</template>

<style scoped>
.group {
  display: flex;
  align-items: start;
  justify-content: space-around;
  border: 2px solid var(--integration-node-color);
  background: rgb(from var(--integration-node-color) r g b / 5%);
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
  background: var(--integration-node-color);
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