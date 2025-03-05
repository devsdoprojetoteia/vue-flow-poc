export default function interpolate(
  template: string | null | undefined,
  variables: Record<string, any>
) {
  return template?.replace(/\{\{([^{}]+)\}\}/g, (_, variableName) => {
    const key = variableName.trim();
    return variables.hasOwnProperty(key) ? String(variables[key]) : '';
  });
}
