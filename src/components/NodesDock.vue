<script setup>
import useDnD from "../composables/useDnD";
import JourneyStepFactory from "../domain/Journey/JourneyStepFactory";
import UUID from "../utils/UUID";
import {
  RootNode,
  MessageNode,
  TextInputNode,
  DeclarationNode,
  IntegrationNode,
  SelectionNode,
  DecisionNode,
  RedirectNode,
} from "./CustomNodes";

const { onDragStart } = useDnD();
</script>

<template>
  <aside>
    <h3 class="description">Arraste o nó desejado</h3>

    <hr />
    <h3>Outputs</h3>
    <ul class="nodes">
      <li
        class="vue-flow__node-message"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.message())"
      >
        <div class="node-preview" id="message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>chat</title>
            <path
              d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z"
            />
          </svg>

          <h4>Mensagem</h4>
        </div>
      </li>
      <li
        class="vue-flow__node-redirect"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.redirect())"
      >
        <div class="node-preview" id="redirect">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>swap-horizontal-bold</title>
            <path
              d="M8,10V13H14V18H8V21L2,15.5L8,10M22,8.5L16,3V6H10V11H16V14L22,8.5Z"
            />
          </svg>

          <h4>Redirecionamento</h4>
        </div>
      </li>
    </ul>

    <hr />
    <h3>Processamento</h3>
    <ul class="nodes">
      <li
        class="vue-flow__node-declaration"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.declaration())"
      >
        <div class="node-preview" id="declaration">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>variable</title>
            <path
              d="M20.41,3C21.8,5.71 22.35,8.84 22,12C21.8,15.16 20.7,18.29 18.83,21L17.3,20C18.91,17.57 19.85,14.8 20,12C20.34,9.2 19.89,6.43 18.7,4L20.41,3M5.17,3L6.7,4C5.09,6.43 4.15,9.2 4,12C3.66,14.8 4.12,17.57 5.3,20L3.61,21C2.21,18.29 1.65,15.17 2,12C2.2,8.84 3.3,5.71 5.17,3M12.08,10.68L14.4,7.45H16.93L13.15,12.45L15.35,17.37H13.09L11.71,14L9.28,17.33H6.76L10.66,12.21L8.53,7.45H10.8L12.08,10.68Z"
            />
          </svg>

          <h4>Declaração</h4>
        </div>
      </li>
      <li
        class="vue-flow__node-decision"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.decision())"
      >
        <div class="node-preview" id="decision">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>apple-keyboard-option</title>
            <path
              d="M3,4H9.11L16.15,18H21V20H14.88L7.84,6H3V4M14,4H21V6H14V4Z"
            />
          </svg>

          <h4>Decisão</h4>
        </div>
      </li>
      <li
        class="vue-flow__node-integration"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.integration())"
      >
        <div class="node-preview" id="integration">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>web</title>
            <path
              d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>

          <h4>Integração</h4>
        </div>
      </li>
    </ul>

    <hr />
    <h3>Inputs</h3>
    <ul class="nodes">
      <li
        class="vue-flow__node-textInput"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.textInput())"
      >
        <div class="node-preview" id="text">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>cursor-text</title>
            <path
              d="M13,19A1,1 0 0,0 14,20H16V22H13.5C12.95,22 12,21.55 12,21C12,21.55 11.05,22 10.5,22H8V20H10A1,1 0 0,0 11,19V5A1,1 0 0,0 10,4H8V2H10.5C11.05,2 12,2.45 12,3C12,2.45 12.95,2 13.5,2H16V4H14A1,1 0 0,0 13,5V19Z"
            />
          </svg>

          <h4>Entrada de Texto</h4>
        </div>
      </li>
      <li
        class="vue-flow__node-selection"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.selection())"
      >
        <div class="node-preview" id="selection">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>sitemap</title>
            <path
              d="M9,2V8H11V11H5C3.89,11 3,11.89 3,13V16H1V22H7V16H5V13H11V16H9V22H15V16H13V13H19V16H17V22H23V16H21V13C21,11.89 20.11,11 19,11H13V8H15V2H9Z"
            />
          </svg>

          <h4>Seleção</h4>
        </div>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
ul.nodes {
  list-style-type: none;
  padding: 0;
}

ul.nodes > li {
  cursor: grab;
  margin-bottom: 16px;
  padding: 12px !important;
}

ul.nodes > li > .node-preview {
  display: flex;
  align-items: center;
}

h4 {
  margin: 0 8px;
}

svg {
  height: 12px !important;
}

#message {
  color: var(--message-node-color) !important;
  fill: currentColor !important;
}
#text {
  color: var(--text-input-node-color) !important;
  fill: currentColor !important;
}
#declaration {
  color: var(--declaration-node-color) !important;
  fill: currentColor !important;
}
#redirect {
  color: var(--redirect-node-color) !important;
  fill: currentColor !important;
}
#decision {
  color: var(--decision-node-color) !important;
  fill: currentColor !important;
}
#selection {
  color: var(--selection-node-color) !important;
  fill: currentColor !important;
}
#integration {
  color: var(--integration-node-color) !important;
  fill: currentColor !important;
}
</style>