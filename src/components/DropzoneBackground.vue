<script lang="ts" setup>
import { Background } from '@vue-flow/background';
</script>

<template>
  <div class="dropzone-background">
    <Background :size="2" :gap="20" pattern-color="#ddd" />

    <div class="overlay">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dropzone-background {
  margin: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10 !important;
}
</style>