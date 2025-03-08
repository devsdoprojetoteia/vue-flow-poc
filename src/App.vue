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
  PostitNode,
} from "./components/CustomNodes";

import { computed, ref, watchEffect } from "vue";
import { VueFlow, useVueFlow } from "@vue-flow/core";
import { MiniMap } from "@vue-flow/minimap";
import { Controls, ControlButton } from "@vue-flow/controls";
import DropzoneBackground from "./components/DropzoneBackground.vue";
import NodesDock from "./components/NodesDock.vue";
import StepEditorDrawer from "./components/StepEditorDrawer.vue";
import ConversationModal from "./components/Conversation/ConversationModal.vue";
import useDragAndDrop from "./composables/useDnD";
import UUID from "./utils/UUID";
import { State } from "./store/store";
import useNodeEditor from "./composables/useNodeEditor";
import useJourneySync from "./composables/useJourneySync";
import useConversationEngine from "./composables/useConversationEngine";
import { Background } from "@vue-flow/background";
import journeyStepFactory from "./domain/Journey/JourneyStepFactory";

const { onInit, onConnect, addEdges, removeEdges, edges } = useVueFlow();
const { onDragOver, onDrop, onDragLeave, isDragging } = useDragAndDrop();
const { isChatting, deploy } = useConversationEngine();
const { isEditing } = useNodeEditor();
const { save, restore } = useJourneySync();

onInit(async () => await restore());

const connections: Record<string, string> = {};

const nodes = ref([
  {
    id: UUID.random().source,
    type: "root",
    position: { x: -25, y: 0 },
    data: journeyStepFactory.root(),
    deletable: false,
    selectable: false,
    draggable: true,
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
      <!-- POSTIT DE OBSERVAÇÕES -->
      <template #node-postit="postitNodeProps">
        <PostitNode v-bind="postitNodeProps" />
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

      <Controls>
        <ControlButton title="Salvar" @click="save">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"
            />
          </svg>
        </ControlButton>
        <ControlButton title="Visualizar" @click="deploy">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M17,19V5H7V19H17M17,1A2,2 0 0,1 19,3V21A2,2 0 0,1 17,23H7C5.89,23 5,22.1 5,21V3C5,1.89 5.89,1 7,1H17M9,7H15V9H9V7M9,11H13V13H9V11Z"
            />
          </svg>
        </ControlButton>
      </Controls>
    </VueFlow>

    <StepEditorDrawer v-if="isEditing" />
    <ConversationModal v-if="isChatting" />
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