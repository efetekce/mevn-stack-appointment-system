<script setup lang="ts">
const { isLoading, appointments, slots, fetchAppointments, fetchSlots } = useAppointment();
// const { appointments, isLoading, slots } = data.value;
let interval: ReturnType<typeof setInterval>;
onMounted(async () => {
  // await Promise.all([fetchAppointments(), fetchSlots()]);
  await fetchSlots();
  await fetchAppointments();

  // if (isLoading) await new Promise((resolve) => setTimeout(resolve, 2000));
  interval = setInterval(async () => {
    console.log("polling", "loading:", isLoading.value);
    if (!isLoading.value) {
      console.log("fetching.");
      await Promise.all([fetchAppointments(), fetchSlots()]);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      console.log("skipping.");
    }
    console.log("loading", isLoading.value);
  }, 300000);
});
onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <div v-show="isLoading" class="text-center">Loading.</div>

      <h1>Randevu Sistemi</h1>
      <AppointmentForm />

      <!-- <AppointmentList /> -->
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply bg-[url(/calendar.svg)] relative min-h-screen bg-no-repeat bg-contain opacity-100 bg-center;
}
.content {
  @apply opacity-100 grid content-center gap-8 absolute inset-0;
}
h1 {
  @apply font-bold text-4xl text-center;
}
</style>
