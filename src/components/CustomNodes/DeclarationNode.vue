<script setup lang="ts">
import { computed } from "vue";
import { Position, Handle } from "@vue-flow/core";
import type { NodeProps } from "@vue-flow/core";
import useNodeEditor from "../../composables/useNodeEditor";
import NodeIcon from "../NodeIcon.vue";
import Variable from "../Variable.vue";

const { edit } = useNodeEditor();
const { data } = defineProps<NodeProps>();
</script>

<template>
  <div class="vue-flow__node-default node-wrapper" @dblclick="() => edit(data)">
    <div class="title">
      <NodeIcon type="declaration" />

      <h4>Declaração</h4>

      <svg
        class="edit-button"
        @click="() => edit(data)"
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

    <code class="variable">
      <i>{{ data.variable.type }}</i>
      <Variable :content="data.variable.name" />
      =
      <Variable :content="data.variable.value" />
    </code>

    <Handle class="socket" type="target" :position="Position.Left" />
    <Handle class="socket" type="source" :position="Position.Right" />
  </div>
</template>

<style scoped>
.node-wrapper {
  border-radius: 2px;
  background: none;
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

.variable {
  margin: 1em;
  font-size: 0.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
  position: relative;
  display: flex;
  gap: 2px;
}

.variable > i {
  color: darkcyan;
}

.variable > .highlighted-variable {
  gap: 2px;
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

.selected .socket {
  border: 1px solid lightblue;
}
</style>
