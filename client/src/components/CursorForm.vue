<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useCursorsStore } from "../store/cursors";
import { computed } from "vue";

const cursorStore = useCursorsStore();

const cursorsSorted = computed(() => {
  const cursors = cursorStore.getCursors ?? [];

  return cursors
    .map((c) => ({
      ...c,
      connected: c.connected ? "connected" : "disconnected",
    }))
    .sort((a, b) => a.connected.localeCompare(b.connected));
});
</script>
<template>
  <DataTable
    :value="cursorsSorted"
    rowKey="id"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10]"
    tableStyle="min-width: 50rem"
    dataKey="id"
  >
    <Column field="id" header="Socket id"></Column>
    <Column field="x" header="offset X"></Column>
    <Column field="y" header="offset Y"></Column>
    <Column field="connected" header="Status"></Column>
  </DataTable>
</template>

<style scoped></style>
