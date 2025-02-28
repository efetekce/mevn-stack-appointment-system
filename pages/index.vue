<script setup lang="ts">
const { slots, appointments, fetchData, fetchSlots, isLoading } = useAppointment();
let interval: ReturnType<typeof setInterval>;
onMounted(() => {
  fetchData();
  fetchSlots();

  interval = setInterval(() => {
    console.log("polling", isLoading.value);
    fetchData();
    console.log(isLoading.value);
  }, 5000);
});
onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div v-if="isLoading" class="text-center">Loading.</div>
  <div class="containerdiv">
    <!-- <pre>{{ slots }}</pre> -->
    <pre>{{ appointments }}</pre>
    <h1>Randevu Sistemi</h1>
    <AppointmentForm />
    <!-- <AppointmentList /> -->
  </div>
</template>

<style scoped>
h1 {
  @apply text-center;
}
</style>
