<script setup lang="ts">
import { computed } from "vue";
import DOMPurify from "dompurify";
import { marked } from "marked";

export interface MarkdownProps {
  content?: string;
}

const { content } = defineProps<MarkdownProps>();

const sanitizedMarkdown = computed(() => {
  if (!content) return "";

  const withLineBreaks = content.replace(/\n/g, "<br>");

  const markdownHtml = marked(withLineBreaks, {
    gfm: true,
    breaks: true,
    async: false,
  });

  return DOMPurify.sanitize(markdownHtml, {
    ALLOWED_TAGS: [
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "p",
      "code",
      "pre",
    ],
    ALLOWED_ATTR: [],
  });
});
</script>

<template>
  <div class="markdown" v-html="sanitizedMarkdown" />
</template>

<style>
.markdown strong {
  font-weight: bold;
}

.markdown em {
  font-style: italic;
}

.markdown code {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 4px;
}
</style>