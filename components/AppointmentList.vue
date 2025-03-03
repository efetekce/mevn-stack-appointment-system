<script setup lang="ts">
const { state } = useAppointmentStore();
</script>

<template>
  <!-- Bad practice: No pagination or filtering -->
  <div
    class="absolute inset-0 size-120"
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
    <!-- <div>{{ state.appointments }},{{ state.slots }}</div> -->
    <div
      v-for="appointment in state.appointments"
      :key="appointment.id"
      style="padding: 10px; border-bottom: 1px solid #ddd"
    >
      {{ appointment.name }} - {{ appointment.date }} {{ appointment.time }}
    </div>
  </div>
</template>

<style scoped></style>
