export default function highlightVariable(
  template: string | null | undefined,
) {
  return template?.replace(/\{\{([^{}]+)\}\}/g, (_, variableName) => {
    return `
      <span>{{</span>
      <b>${variableName.trim()}</b>
      <span>}}</span>
    `;
  });
}
