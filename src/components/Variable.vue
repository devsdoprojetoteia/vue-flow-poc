<script setup lang="ts">
import { computed } from "vue";
import highlightVariable from "../utils/highlightVariable";

export interface CodeProps {
  content?: string;
}

const { content } = defineProps<CodeProps>();

const highlightedVariable = computed(() => highlightVariable(content));
</script>

<template>
  <div class="highlighted-variable" v-html="highlightedVariable" />
</template>

<style scoped>
.highlighted-variable {
  font-family: "Roboto Mono", Courier, monospace !important;
  display: flex;
  gap: 0;
}

.highlighted-variable:deep > b {
  color: blue !important;
}
</style>