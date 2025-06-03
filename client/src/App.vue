<script setup>
import CursorForm from "./components/CursorForm.vue";
import CursorLayer from "./components/CursorLayer.vue";
</script>

<template>
  <div class="wrapper">
    <CursorForm />
    <CursorLayer />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}
</style>
