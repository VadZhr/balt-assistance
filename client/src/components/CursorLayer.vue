<script setup>
import Cursor from "./Cursor.vue";
import { useCursorsStore } from "../store/cursors";
import { computed, ref } from "vue";
import { socket } from "../services/socket";

const cursorsStore = useCursorsStore();

const isCursorActive = ref(false);

const curosrs = computed(()=>cursorsStore.getCursors.filter(cur => cur.connected))

const mousePosition = ref({
  x: 0,
  y: 0,
});

function handleMouseMove(event) {
  isCursorActive.value = true;
  mousePosition.value.x = Math.max(
    0,
    event.clientX - event.currentTarget.getBoundingClientRect().left
  );
  mousePosition.value.y = Math.max(
    0,
    event.clientY - event.currentTarget.getBoundingClientRect().top
  );

  const newMousePosition = {
    x:
      mousePosition.value.x < 10
        ? 0
        : mousePosition.value.x > 290
        ? 280
        : mousePosition.value.x - 10,
    y:
      mousePosition.value.y < 10
        ? 0
        : mousePosition.value.y > 290
        ? 280
        : mousePosition.value.y - 10,
  };
  cursorsStore.addOrUpdateCursor({
    ...newMousePosition,
    id: socket.id,
  });
  socket.emit("mouse_move", {
    ...newMousePosition,
    color: cursorsStore.cursors[socket.id].color,
  });
}

function handleMouseLeave() {
  isCursorActive.value = false;
};
</script>

<template>
  <div class="cursorLayer" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <Cursor
      v-for="el in curosrs"
      :color="el.color"
      :x="el.x"
      :y="el.y"
      :key="el.id"
      :isCursorActive="el.id === socket.id ? isCursorActive ? true : false : true" />
  </div>
</template>

<style scoped>
.cursorLayer {
  position: relative;
  width: 300px;
  height: 300px;
  background-color: rgb(239, 194, 15);
}
</style>
