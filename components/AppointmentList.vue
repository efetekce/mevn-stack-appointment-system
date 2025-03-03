<script setup lang="ts">
const { state } = useAppointmentStore();

onMounted(() => {
  // setTimeout(() => (state.value.showList = false), 10000);
});
</script>

<template>
  <!-- Bad practice: No pagination or filtering -->
  <div
    class="flex flex-col items-center fixed inset-80 overflow-y-auto"
    style="
      max-width: 600px;
      margin: 20px auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    "
  >
    <h2 style="margin-bottom: 20px">Mevcut Randevular</h2>
    <button class="top-4 right-4 absolute" @click="state.showList = false">X</button>
    <div
      v-for="appointment in state.appointments"
      :key="appointment.id"
      style="padding: 10px; border-bottom: 1px solid #ddd"
      class="w-full text-center"
    >
      {{ appointment.name }} - {{ appointment.date }} {{ appointment.time }}
    </div>
  </div>
</template>

<style scoped></style>
