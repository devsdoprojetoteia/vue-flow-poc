<script setup>
import useDnD from "../composables/useDnD";
import useJourneySync from "../composables/useJourneySync";
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
const { isSynchronizing } = useJourneySync();
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

    <div class="footer" v-if="isSynchronizing">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>loading</title>
        <path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
      </svg>
      <span> Sincronizando... </span>
    </div>
  </aside>
</template>

<style scoped>
aside {
  position: relative;
}

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

.footer {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  text-align: center;
  padding: 8px 16px;
  background: #fff4;
}

.footer > svg {
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>