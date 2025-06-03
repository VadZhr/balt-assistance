import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "./style.css";
import App from "./App.vue";
import { useCursorsStore } from "./store/cursors";
import { createPinia } from "pinia";
import { socket } from "./services/socket";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

const cursorStore = useCursorsStore();

socket.on("initial_cursors", (arr) => {
  // arr = [{ id, x, y, color, connected }, …]
  cursorStore.setInitialCursors(arr);
});

socket.on("cursor_moved", (data) => {
  // data = { id, x, y, color }
  cursorStore.addOrUpdateCursor(data);
});

socket.on("cursor_disconnected", ({ id }) => {
  cursorStore.disconnectById(id);
});

app.mount("#app");
