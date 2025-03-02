<script setup lang="ts">
const { fetchAppointments, fetchSlots, state } = useAppointmentStore();
// console.log(slots);
let interval: ReturnType<typeof setInterval>;

onMounted(async () => {
  await fetchSlots();
  fetchAppointments();

  // interval = setInterval(async () => {
  //   console.log("polling", "loading:", isLoading.value);
  //   if (!isLoading.value) {
  //     console.log("fetching.");
  //     await fetchSlots();
  //   } else {
  //     console.log("skipping.");
  //   }
  //   console.log("loading", isLoading.value);
  // }, 3000);
});

// onUnmounted(() => clearInterval(interval));
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <div v-show="state.isLoading" class="text-center">Loading.</div>

      <h1>Randevu Sistemi</h1>
      <AppointmentForm />

      <div v-if="state.showList">
        <AppointmentList />
      </div>
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
