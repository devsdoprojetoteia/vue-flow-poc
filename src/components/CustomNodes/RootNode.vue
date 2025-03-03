<script setup lang="ts">
import { Position, Handle, NodeProps } from "@vue-flow/core";
import NodeIcon from "../NodeIcon.vue";
import { Journey } from "../../domain/Journey/Journey";

const { data } = defineProps<NodeProps<Journey.Root>>();

function copyToClipboard() {
  navigator.clipboard.writeText(data.journeyId.source);
}
</script>

<template>
  <div class="vue-flow__node-default node-wrapper">
    <div class="title">
      <NodeIcon type="root" />

      <h4>Jornada</h4>

      <svg
        class="copy-to-clipboard-button"
        @click="copyToClipboard"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <title>content-copy</title>
        <path
          d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
        />
      </svg>
    </div>

    <Handle class="socket" type="source" :position="Position.Right" />
  </div>
</template>

<style scoped>
.node-wrapper {
  width: fit-content; /* CUSTOM */
  border-radius: 2px;
  background: rgb(from var(--root-node-color) r g b / 10%); /* CUSTOM */
  border: 1px solid lightgray;
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
  color: black;
  padding: 0;
}

.title {
  color: var(--root-node-color);
  padding: 0.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.title > h4 {
  font-size: 0.6rem;
  margin: 0 auto;
  padding: 0 0.5em;
  flex: 1;
  text-align: left;
}

.title > svg {
  height: 0.6rem;
  fill: var(--root-node-color);
  padding: 2px;
  border-radius: 2px;
}

.copy-to-clipboard-button {
  visibility: hidden;
  cursor: pointer;
}

.copy-to-clipboard-button:hover {
  background: var(--root-node-color);
  fill: white;
}

.node-wrapper:hover > .title > .copy-to-clipboard-button,
.selected > .node-wrapper > .title > .copy-to-clipboard-button {
  visibility: inherit;
}

.socket {
  background: var(--root-node-color) !important;
  visibility: inherit;
}

.socket:hover {
  background: rgb(from var(--root-node-color) r g b / 80%) !important;
  -webkit-box-shadow: 0px 0px 3px 1px var(--root-node-color);
  -moz-box-shadow: 0px 0px 3px 1px var(--root-node-color);
  box-shadow: 0px 0px 3px 1px var(--root-node-color);
  border: none;
}
</style>
