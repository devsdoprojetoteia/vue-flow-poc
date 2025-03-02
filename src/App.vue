<script setup lang="ts">
import {
  RootNode,
  MessageNode,
  TextInputNode,
  DeclarationNode,
  IntegrationNode,
  SelectionNode,
  DecisionNode,
  RedirectNode,
} from "./components/CustomNodes";

import { computed, ref } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import DropzoneBackground from "./components/DropzoneBackground.vue";
import NodesDock from "./components/NodesDock.vue";
import useDragAndDrop from "./composables/useDnD";
import UUID from "./utils/UUID";
import { useStore } from "vuex";
import { State } from "./store/store";

const { onConnect, addEdges, removeEdges, edges } = useVueFlow();

const $store = useStore<State>();

const { onDragOver, onDrop, onDragLeave } = useDragAndDrop();

const connections: Record<string, string> = {};

const nodes = ref([
  {
    id: UUID.random().toString(),
    type: "root",
    position: { x: -25, y: 0 },
    data: { journeyId: "924621c3-49dd-51b1-a783-ca098e485fa1" },
    deletable: false,
    selectable: false,
    draggable: false,
  },
]);

onConnect((connection) => {
  const animatedConnection = { ...connection, animated: true };
  const source = animatedConnection.sourceHandle ?? animatedConnection.source;
  const currentTarget = connections[source];

  if (!currentTarget) {
    addEdges(animatedConnection);
  } else {
    const replaceableEdge = edges.value.find((edge) => {
      return (
        (edge.targetHandle == currentTarget || edge.target == currentTarget) &&
        (edge.sourceHandle == source || edge.source == source)
      );
    });

    if (!!replaceableEdge) removeEdges(replaceableEdge);

    addEdges(animatedConnection);
  }

  connections[source] =
    animatedConnection.targetHandle ?? animatedConnection.target;
});
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      fit-view-on-init
    >
      <!-- NÓ RAÍZ/INICIAL -->
      <template #node-root="rootNodeProps">
        <RootNode v-bind="rootNodeProps" />
      </template>
      <!-- NÓ DE ENVIO DE MENSAGEM -->
      <template #node-message="messageNodeProps">
        <MessageNode v-bind="messageNodeProps" />
      </template>
      <!-- NÓ DE RECEBIMENTO DE MENSAGEM -->
      <template #node-textInput="textInputNodeProps">
        <TextInputNode v-bind="textInputNodeProps" />
      </template>
      <!-- NÓ DE DECLARAÇÃO DE VARIÁVEL -->
      <template #node-declaration="declarationNodeProps">
        <DeclarationNode v-bind="declarationNodeProps" />
      </template>
      <!-- NÓ DE INTEGRAÇÃO COM APIS REST -->
      <template #node-integration="integrationNodeProps">
        <IntegrationNode v-bind="integrationNodeProps" />
      </template>
      <!-- NÓ DE ENVIO DE SELEÇÃO MÚLTIPLA -->
      <template #node-selection="selectionNodeProps">
        <SelectionNode v-bind="selectionNodeProps" />
      </template>
      <!-- NÓ DE DECISÃO LÓGICA -->
      <template #node-decision="decisionNodeProps">
        <DecisionNode v-bind="decisionNodeProps" />
      </template>
      <!-- NÓ DE REDIRECIONAMENTO DE JORNADA -->
      <template #node-redirect="redirectNodeProps">
        <RedirectNode v-bind="redirectNodeProps" />
      </template>

      <DropzoneBackground
        :style="{
          backgroundColor: $store.state.dnd.isDragging
            ? '#e7f3ff'
            : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="$store.state.dnd.isDragging">Solte o nó aqui</p>
      </DropzoneBackground>

      <Background variant="dots" />
    </VueFlow>

    <NodesDock />
  </div>
</template>

<style>
/* import the necessary styles for Vue Flow to work */
@import "@vue-flow/core/dist/style.css";

/* import the default theme, this is optional but generally recommended */
@import "@vue-flow/core/dist/theme-default.css";

.vue-flow {
  height: 100vh;
  width: 100vw;
}
</style>