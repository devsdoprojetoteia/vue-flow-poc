import type { Journey } from "../../domain/Journey/Journey";

export default function humanizeStepType(
  stepType?: Journey.StepType,
): string | undefined {
  if (!stepType) return stepType;

  const dict: Record<Journey.StepType, string> = {
    root: "raíz",
    message: "mensagem",
    redirect: "redirecionamento",
    declaration: "declaração",
    decision: "decisão",
    integration: "integração",
    "text-input": "entrada de texto",
    selection: "seleção",
  }

  return dict[stepType];
}
