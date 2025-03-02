<script setup lang="ts">
import { FormKit } from "@formkit/vue";
import { computed, ref, Ref } from "vue";
import humanizeStepType from "../utils/humanize/humanizeStepType";
import useNodeEditor from "../composables/useNodeEditor";
import { Journey } from "../domain/Journey/Journey";
import MessageEditor from "./StepEditors/MessageEditor.vue";

const { isEditing, cancel, nodeData } = useNodeEditor();

const step = computed(() => nodeData.value.step);
const title = computed(() => `Editando o nó ${humanizeStepType(step.value)}`);
</script>

<template>
  <div class="drawer-wrapper">
    <div class="background" @click="cancel" />
    <div class="drawer-content">
      <div class="drawer-header">
        <h3 class="drawer-header-title">{{ title }}</h3>
        <svg
          class="drawer-close-button"
          @click="cancel"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>close</title>
          <path
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </svg>
      </div>
      <MessageEditor v-if="step == 'message'" />
      <div class="form-wrapper"></div>
    </div>
  </div>
</template>

<style scoped>
.drawer-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
}

.background {
  height: 100%;
  width: 100%;
  background: var(--default-dark-color);
}

.drawer-content {
  height: 100%;
  width: 50%;
  min-width: 300px;
  background: white;
  padding: 1rem;
  display: block;
}

.drawer-header {
  display: flex;
  flex-direction: row;
  align-items: space-between;
  justify-content: center;
}

.drawer-header-title {
  flex: 1;
}

.drawer-close-button {
  height: 16px;
  width: 16px;
  padding: 2px;
  border-radius: 2px;
  cursor: pointer;
}

.drawer-close-button:hover {
  opacity: 0.5;
}
</style>