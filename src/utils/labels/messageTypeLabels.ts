import type { Journey } from "../../domain/Journey/Journey";

const messageTypeLabels: Record<Journey.Message.Type, string> = {
  image: "imagem",
  text: "texto",
  video: "vídeo",
}

export default messageTypeLabels;
