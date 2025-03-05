<script setup lang="ts">
import { computed } from "vue";
import { Position, Handle } from "@vue-flow/core";
import type { HandleConnectableFunc, NodeProps } from "@vue-flow/core";
import useNodeEditor from "../../composables/useNodeEditor";
import NodeIcon from "../NodeIcon.vue";

const { edit } = useNodeEditor();
const { data } = defineProps<NodeProps>();

const title = computed(() => data.title);
const options = computed(() =>
  data.options.map(({ id, label }) => {
    return { id: id.source, label };
  })
);
const defaultOption = computed(() => ({
  id: data.defaultOption.id.source,
  variableName: `{{ ${data.defaultOption.variableName} }}`,
}));
</script>

<template>
  <div class="vue-flow__node-default node-wrapper">
    <div class="title">
      <NodeIcon type="selection" />

      <h4>Seleção</h4>

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

    <b class="selection-title">{{ title }}</b>

    <div class="divider" />

    <div class="options-wrapper" v-for="option in options" :key="option.id">
      <div class="option">
        <div class="option-label">{{ option.label }}</div>
        <Handle
          :id="option.id"
          class="socket"
          type="source"
          :position="Position.Right"
        />
      </div>
    </div>

    <Handle class="socket" type="target" :position="Position.Left" />

    <div class="divider" />

    <div class="option">
      <code class="option-label">{{ defaultOption.variableName }}</code>
      <Handle
        :id="defaultOption.id"
        class="socket"
        type="source"
        :position="Position.Right"
      />
    </div>
  </div>

  <Handle class="socket" type="target" :position="Position.Left" />
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
  color: var(--selection-node-color);
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
  fill: var(--selection-node-color);
  padding: 2px;
  border-radius: 2px;
}

.edit-button {
  display: none;
  cursor: pointer;
}

.edit-button:hover {
  background: var(--selection-node-color);
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

.selection-title,
.option-label {
  margin: 1em;
  font-size: 0.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: justify;
  position: relative;
}

.option {
  position: relative;
}

.option > .socket {
  position: absolute;
  top: 50%;
  right: 0;
}

.socket {
  background: var(--selection-node-color) !important;
  border: none;
  top: 12px;
}

.socket[data-handlepos="left"] {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.socket:hover {
  background: rgb(from var(--selection-node-color) r g b / 80%) !important;
  -webkit-box-shadow: 0px 0px 3px 1px var(--selection-node-color);
  -moz-box-shadow: 0px 0px 3px 1px var(--selection-node-color);
  box-shadow: 0px 0px 3px 1px var(--selection-node-color);
  border: none;
}

.selected > .node-wrapper > .socket {
  border: 1px solid lightblue;
}
</style>
