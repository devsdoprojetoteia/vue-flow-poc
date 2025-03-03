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

import { computed, ref, watchEffect } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { MiniMap } from "@vue-flow/minimap";
import DropzoneBackground from "./components/DropzoneBackground.vue";
import NodesDock from "./components/NodesDock.vue";
import StepEditorDrawer from "./components/StepEditorDrawer.vue";
import useDragAndDrop from "./composables/useDnD";
import UUID from "./utils/UUID";
import { State } from "./store/store";
import useNodeEditor from "./composables/useNodeEditor";
import useJourneySync from "./composables/useJourneySync";

const { onInit, onConnect, addEdges, removeEdges, edges } = useVueFlow();
const { onDragOver, onDrop, onDragLeave, isDragging } = useDragAndDrop();
const { isEditing } = useNodeEditor();
const { save, restore } = useJourneySync();

onInit(async () => await restore());

const connections: Record<string, string> = {};

const nodes = ref([
  {
    id: UUID.random().source,
    type: "root",
    position: { x: -25, y: 0 },
    data: { journeyId: UUID.random().source },
    deletable: false,
    selectable: false,
    draggable: false,
  },
]);

onConnect((connection) => {
  const animatedConnection = {
    ...connection,
    animated: true,
    type: "smoothstep",
  };
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

  save();
});
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <NodesDock />

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
      <template #node-text-input="textInputNodeProps">
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
          backgroundColor: isDragging ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="isDragging">Solte o nó aqui</p>

        <Background variant="dots" />
      </DropzoneBackground>

      <MiniMap pannable zoomable />
    </VueFlow>

    <StepEditorDrawer v-if="isEditing" />
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