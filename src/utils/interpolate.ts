export default function interpolate(
  template: string | null | undefined,
  variables: Record<string, any>
) {
  return template?.replace(/\{\{([^{}]+)\}\}/g, (_, path) => {
    const keys = path.trim().split(".");
    let value: any = variables;

    for (const key of keys) {
      if (typeof value !== 'object' || value === null) return '';
      value = value[key];
    }

    return String(value ?? '');
  });
}
