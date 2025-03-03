export default function capitalize(value?: string): string | undefined {
  if (!value) return value;

  const firstChar = value.charAt(0);

  return `${firstChar.toLocaleUpperCase()}${value.slice(1, value.length)}`;
}
