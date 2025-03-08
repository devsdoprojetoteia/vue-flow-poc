<script setup lang="ts">
import { ref, onMounted } from "vue";
import { NodeProps, useVueFlow } from "@vue-flow/core";
import { Journey } from "../../domain/Journey/Journey";
import useNodeEditor from "../../composables/useNodeEditor";

const { data } = defineProps<NodeProps<Journey.Postit>>();
const { updateNode, panOnDrag } = useVueFlow();
const { apply } = useNodeEditor();

const content = ref(data.content);
const textareaRef = ref<HTMLTextAreaElement>();
const replicatedValue = ref<string>();

onMounted(() => {
  if (textareaRef.value) {
    replicatedValue.value = textareaRef.value?.value;
  }
});

function focusOnTextarea() {
  textareaRef.value?.focus();
}

function handleInput() {
  replicatedValue.value = content.value;
  apply({ ...data, content: content.value } as Journey.Postit);
}

function handleFocus() {
  updateNode(data.id.source, { draggable: false });
  panOnDrag.value = false;
}

function handleBlur() {
  updateNode(data.id.source, { draggable: true });
  panOnDrag.value = true;
}
</script>

<template>
  <div class="post-it" @dblclick="focusOnTextarea">
    <div class="grow-wrap" :data-replicated-value="replicatedValue">
      <textarea
        ref="textareaRef"
        v-model="content"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
  </div>
</template>

<style>
.selected > .post-it {
  -webkit-box-shadow: var(--default-shadow-highlight);
  -moz-box-shadow: var(--default-shadow-highlight);
  box-shadow: var(--default-shadow-highlight);
}

.post-it {
  background-color: lightgoldenrodyellow;
  width: 120px;
  height: 120px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.3);
}

.grow-wrap {
  display: grid;
  max-width: 120px;
  padding: 10px !important;
}

.grow-wrap::after {
  content: attr(data-replicated-value) " ";
  white-space: pre-wrap;
  visibility: hidden;
}

.grow-wrap > textarea {
  resize: none;
  overflow: hidden;
}

.grow-wrap > textarea,
.grow-wrap::after {
  font-size: x-small !important;
  font-weight: bolder !important;
  border: none;
  background: transparent;
  resize: none;
  outline: none;
  text-align: center;
  max-height: calc(120px - 20px);

  white-space: pre-wrap;
  overflow-wrap: break-word;

  grid-area: 1 / 1 / 2 / 2;
}

textarea:focus {
  border: none !important;
  box-shadow: none !important;
}
</style>