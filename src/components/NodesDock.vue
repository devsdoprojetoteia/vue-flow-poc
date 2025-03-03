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
import NodeIcon from "./NodeIcon.vue";

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
          <NodeIcon type="message" />
          <h4>Mensagem</h4>
        </div>
      </li>
      <li
        class="vue-flow__node-redirect"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.redirect())"
      >
        <div class="node-preview" id="redirect">
          <NodeIcon type="redirect" />
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
          <NodeIcon type="declaration" />
          <h4>Declaração</h4>
        </div>
      </li>
      <li
        class="vue-flow__node-decision"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.decision())"
      >
        <div class="node-preview" id="decision">
          <NodeIcon type="decision" />
          <h4>Decisão</h4>
        </div>
      </li>
      <li
        class="vue-flow__node-integration"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.integration())"
      >
        <div class="node-preview" id="integration">
          <NodeIcon type="integration" />
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
          <NodeIcon type="text-input" />
          <h4>Entrada de Texto</h4>
        </div>
      </li>
      <li
        class="vue-flow__node-selection"
        :draggable="true"
        @dragstart="onDragStart($event, JourneyStepFactory.selection())"
      >
        <div class="node-preview" id="selection">
          <NodeIcon type="selection" />
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