import type { Journey } from "../../domain/Journey/Journey";

const requestMethodLabels: Record<Journey.Integration.Method, string> = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  put: "PUT",
  delete: "DELETE",
}

export default requestMethodLabels;
