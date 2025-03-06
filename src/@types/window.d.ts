import type EmulatedEngine from "../domain/Conversation/Engine";

declare global {

  interface Window {
    emulatedEngine?: EmulatedEngine;
  }

}
