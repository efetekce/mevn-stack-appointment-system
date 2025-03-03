<script setup lang="ts">
const { fetchAppointments, fetchSlots, state } = useAppointmentStore();
// console.log(slots);
let interval: ReturnType<typeof setInterval>;

onMounted(async () => {
  await fetchSlots();
  await fetchAppointments();

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
      <h1>Randevu Sistemi</h1>
      <div v-if="!state.showList">
        <AppointmentForm />
      </div>
      <AppointmentList v-else />

      <div v-if="state.isLoading">
        <Loader />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply relative min-h-screen;
}
.wrapper::before {
  content: "";
  @apply bg-[url(/calendar.svg)] bg-no-repeat bg-center bg-contain opacity-40 absolute inset-0;
  z-index: -1;
}
.content {
  @apply opacity-90 grid content-center gap-8 absolute inset-0;
}
h1 {
  @apply font-bold text-4xl text-center;
}
</style>
