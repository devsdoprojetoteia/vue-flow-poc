<script setup lang="ts">
import { computed } from "vue";
import { Position, Handle } from "@vue-flow/core";
import type { NodeProps } from "@vue-flow/core";

const { data } = defineProps<NodeProps>();

const title = computed(() => data.title);
const targetJourneyId = computed(() => data.targetJourneyId);
</script>

<template>
  <div class="vue-flow__node-default node-wrapper">
    <div class="title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>swap-horizontal-bold</title>
        <path
          d="M8,10V13H14V18H8V21L2,15.5L8,10M22,8.5L16,3V6H10V11H16V14L22,8.5Z"
        />
      </svg>

      <h4>Redirecionamento</h4>

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

    <span class="journey-title">{{ title }}</span>

    <div class="divider" />

    <code class="journey-id">{{ targetJourneyId }}</code>

    <Handle class="socket" type="target" :position="Position.Left" />
  </div>
</template>

<style scoped>
.node-wrapper {
  background: rgb(
    from var(--redirect-node-color) r g b / 5%
  ) !important; /* CUSTOM */
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
  color: var(--redirect-node-color);
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
  fill: var(--redirect-node-color);
  padding: 2px;
  border-radius: 2px;
}

.edit-button {
  display: none;
  cursor: pointer;
}

.edit-button:hover {
  background: var(--redirect-node-color);
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

.journey-id, .journey-title {
  margin: 1em;
  font-size: 0.4rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: justify;
  position: relative;
  z-index: 1;
}

.socket {
  background: var(--redirect-node-color) !important;
  border: none;
  top: 12px;
}

.socket[data-handlepos="left"] {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.socket:hover {
  background: rgb(from var(--redirect-node-color) r g b / 80%) !important;
  -webkit-box-shadow: 0px 0px 3px 1px var(--redirect-node-color);
  -moz-box-shadow: 0px 0px 3px 1px var(--redirect-node-color);
  box-shadow: 0px 0px 3px 1px var(--redirect-node-color);
  border: none;
}

.selected > .node-wrapper > .socket {
  border: 1px solid lightblue;
}
</style>
