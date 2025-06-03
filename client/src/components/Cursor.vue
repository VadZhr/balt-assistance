<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  isCursorActive: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div
    @click="handleClick"
    class="cursor"
    :style="{
      backgroundColor: props.color,
      marginTop: `${props.y}px`,
      marginLeft: `${props.x}px`,
    }"
    v-if="isCursorActive"
  ></div>
</template>

<style scoped>
.cursor {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
