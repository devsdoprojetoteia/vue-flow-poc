<script setup lang="ts">
import { computed } from "vue";
import { Position, Handle } from "@vue-flow/core";
import type { NodeProps } from "@vue-flow/core";
import useNodeEditor from "../../composables/useNodeEditor";

const { edit } = useNodeEditor();
const { data } = defineProps<NodeProps>();

const targetVariableName = computed(() => `{{ ${data.targetVariableName} }}`);
const request = computed(() => {
  const { url, method, headers, body } = data.request;
  let curl = "curl";

  if (!!url && url != "") curl += ` ${url} \\\n`;
  if (!!method && method != "") curl += `  -X ${method} \\\n`;
  if (!!headers)
    Object.entries(headers).forEach(([key, value]) => {
      curl += `  --header "${key}: ${value}" \\\n`;
    });
  if (!!body) curl += `  -d "${JSON.stringify(body)}"`

  return curl;
});
</script>

<template>
  <div class="vue-flow__node-default node-wrapper">
    <div class="title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>web</title>
        <path
          d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
        />
      </svg>

      <h4>Integração</h4>

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
    <code class="varname">{{ targetVariableName }}</code>
    <div class="divider" />
    <code class="request">{{ request }}</code>

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
  color: var(--integration-node-color);
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
  fill: var(--integration-node-color);
  padding: 2px;
  border-radius: 2px;
}

.edit-button {
  display: none;
  cursor: pointer;
}

.edit-button:hover {
  background: var(--integration-node-color);
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

.varname,
.request {
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

.request {
  text-align: left;
  -webkit-line-clamp: 6;
  line-clamp: 6;
}

.socket {
  background: var(--integration-node-color) !important;
  border: none;
  top: 12px;
}

.socket[data-handlepos="left"] {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.socket:hover {
  background: rgb(from var(--integration-node-color) r g b / 80%) !important;
  -webkit-box-shadow: 0px 0px 3px 1px var(--integration-node-color);
  -moz-box-shadow: 0px 0px 3px 1px var(--integration-node-color);
  box-shadow: 0px 0px 3px 1px var(--integration-node-color);
  border: none;
}

.selected > .node-wrapper > .socket {
  border: 1px solid lightblue;
}
</style>
