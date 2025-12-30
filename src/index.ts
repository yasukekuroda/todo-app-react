import { App } from "./App.js";

const app = new App();
window.addEventListener("load", () => {
  app.mount();
});
window.addEventListener("unload", () => {
  app.unmount();
});
