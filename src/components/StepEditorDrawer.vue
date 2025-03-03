<script setup lang="ts">
import { FormKit } from "@formkit/vue";
import { computed, ref, Ref } from "vue";
import humanizeStepType from "../utils/humanize/humanizeStepType";
import useNodeEditor from "../composables/useNodeEditor";
import { Journey } from "../domain/Journey/Journey";
import MessageEditor from "./StepEditors/MessageEditor.vue";
import capitalize from "../utils/humanize/capitalize";
import NodeIcon from "./NodeIcon.vue";
import ftob from "../utils/ftob";
import RedirectEditor from "./StepEditors/RedirectEditor.vue";
import DeclarationEditor from "./StepEditors/DeclarationEditor.vue";
import DecisionEditor from "./StepEditors/DecisionEditor.vue";
import IntegrationEditor from "./StepEditors/IntegrationEditor.vue";
import SelectionEditor from "./StepEditors/SelectionEditor.vue";
import TextInputEditor from "./StepEditors/TextInputEditor.vue";

const { cancel, nodeData, apply } = useNodeEditor();

const step = computed(() => nodeData.value.step);
const title = computed(() => capitalize(humanizeStepType(step.value)));
</script>

<template>
  <div class="drawer-wrapper">
    <div class="background" @click="cancel" />
    <div class="drawer-content">
      <div
        class="drawer-header"
        :style="{
          color: `var(--${step}-node-color)`,
          fill: `var(--${step}-node-color)`,
        }"
      >
        <NodeIcon :type="step ?? 'root'" />

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

      <div class="form-wrapper">
        <FormKit
          type="form"
          submit-label="Salvar"
          v-model="nodeData"
          @submit="apply"
        >
          <MessageEditor v-if="step === 'message'" v-bind="nodeData" />
          <RedirectEditor v-if="step === 'redirect'" v-bind="nodeData" />
          <DeclarationEditor v-if="step === 'declaration'" v-bind="nodeData" />
          <DecisionEditor v-if="step === 'decision'" v-bind="nodeData" />
          <IntegrationEditor v-if="step === 'integration'" v-bind="nodeData" />
          <TextInputEditor v-if="step === 'text-input'" v-bind="nodeData" />
          <SelectionEditor v-if="step === 'selection'" v-bind="nodeData" />
        </FormKit>
      </div>
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
  overflow: scroll;
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
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.drawer-header > svg {
  height: 24px;
  fill: var(--message-node-color);
  padding: 2px;
  border-radius: 2px;
}

h3.drawer-header-title {
  flex: 1;
  padding: 0 8px;
  margin: 0 auto;
}

.drawer-close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  fill: black !important;
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