import { defineStore } from "pinia";
import { socket } from "../services/socket";

export const useCursorsStore = defineStore("cursors", {
  state: () => ({
    cursors: {},
  }),
  actions: {
    setInitialCursors(arr) {
      arr.forEach(({ x, y, connected, color, id }) => {
        this.cursors[id] = {
          x,
          y,
          color,
          connected,
        };
      });
    },
    addOrUpdateCursor(payload) {
      if (this.cursors[payload.id]) {
        this.cursors[payload.id].x = payload.x;
        this.cursors[payload.id].y = payload.y;
      } else {
        this.cursors[payload.id] = {
          x: payload.x,
          y: payload.y,
          color: payload.color,
          connected: true,
        };
      }
    },
    disconnectById(id) {
      if (this.cursors[id]) {
        this.cursors[id].connected = false;
      }
    },
  },
  getters: {
    getCursors: (state) =>
      Object.entries(state.cursors).map(([key, value]) => ({
        id: key,
        ...value,
      })),
  },
});
