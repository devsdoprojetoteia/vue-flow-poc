<script setup lang="ts">
import { computed } from "vue";
import { Position, Handle } from "@vue-flow/core";
import type { NodeProps } from "@vue-flow/core";

const { data } = defineProps<NodeProps>();

const variable = computed(() => {
  let text = `${data.variable.name}: ${data.variable.type} = `;

  switch (data.variable.type) {
    case "string":
      text += `"${data.variable.value}"`
      break;
    default:
      text += JSON.stringify(data.variable.value);
      break;
  }

  return text;
});
</script>

<template>
  <div class="vue-flow__node-default node-wrapper">
    <div class="title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>variable</title>
        <path
          d="M20.41,3C21.8,5.71 22.35,8.84 22,12C21.8,15.16 20.7,18.29 18.83,21L17.3,20C18.91,17.57 19.85,14.8 20,12C20.34,9.2 19.89,6.43 18.7,4L20.41,3M5.17,3L6.7,4C5.09,6.43 4.15,9.2 4,12C3.66,14.8 4.12,17.57 5.3,20L3.61,21C2.21,18.29 1.65,15.17 2,12C2.2,8.84 3.3,5.71 5.17,3M12.08,10.68L14.4,7.45H16.93L13.15,12.45L15.35,17.37H13.09L11.71,14L9.28,17.33H6.76L10.66,12.21L8.53,7.45H10.8L12.08,10.68Z"
        />
      </svg>

      <h4>Declaração</h4>

      <svg
        class="edit-button"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <title>pencil</title>
        <path
          d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
        />
      </svg>
    </div>

    <div class="divider" />

    <code class="varname">{{ variable }}</code>

    <Handle class="socket" type="target" :position="Position.Left" />
    <Handle class="socket" type="source" :position="Position.Right" />
  </div>
</template>

<style scoped>
.node-wrapper {
  border-radius: 2px;
  background: white;
  border: 1px solid lightgray;
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
  color: black;
  padding: 0;
}

.selected > .node-wrapper {
  border: 1px solid lightblue;
  -webkit-box-shadow: var(--default-shadow-highlight);
  -moz-box-shadow: var(--default-shadow-highlight);
  box-shadow: var(--default-shadow-highlight);
}

.title {
  color: var(--declaration-node-color);
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
  fill: var(--declaration-node-color);
  padding: 2px;
  border-radius: 2px;
}

.edit-button {
  display: none;
  cursor: pointer;
}

.edit-button:hover {
  background: var(--declaration-node-color);
  fill: white;
}

.node-wrapper:hover > .title > .edit-button,
.selected > .node-wrapper > .title > .edit-button {
  display: block;
}

.divider {
  margin: 0;
  height: 0.2px;
  background: lightgray;
}

.selected > .node-wrapper > .divider {
  background: lightblue;
}

.varname {
  margin: 1em;
  font-size: 0.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
  position: relative;
  z-index: 1;
}

.socket {
  background: var(--declaration-node-color) !important;
  border: none;
  top: 12px;
}

.socket[data-handlepos="left"] {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.socket:hover {
  background: rgb(from var(--declaration-node-color) r g b / 80%) !important;
  -webkit-box-shadow: 0px 0px 3px 1px var(--declaration-node-color);
  -moz-box-shadow: 0px 0px 3px 1px var(--declaration-node-color);
  box-shadow: 0px 0px 3px 1px var(--declaration-node-color);
  border: none;
}

.selected > .node-wrapper > .socket {
  border: 1px solid lightblue;
}
</style>
