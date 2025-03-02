<script setup lang="ts">
import { z } from "zod";

const { name, appointmentDate, appointmentTime, slots, filteredTimes, saveAppointment } =
  useAppointment();
const isLoading = ref(false);
const formSchema = z.object({
  name: z.string().min(3, "Adınız en az 3 karakterden oluşmalıdır."),
  appointmentDate: z.string().min(1, "Lütfen bir tarih seçin."),
  appointmentTime: z.string().min(1, "Lütfen bir zaman aralığı seçin."),
});

type Errors = Record<keyof typeof formSchema.shape, string>;

const errors = ref<Errors>({
  name: "",
  appointmentDate: "",
  appointmentTime: "",
});

const validateForm = async () => {
  const result = formSchema.safeParse({
    name: name.value,
    appointmentDate: appointmentDate.value,
    appointmentTime: appointmentTime.value,
  });

  if (!result.success) {
    errors.value = Object.fromEntries(
      result.error.errors.map((err) => [err.path[0], err.message])
    ) as Errors;
  } else {
    try {
      console.log("Valid form:", result.data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // await saveAppointment(result.data);
      errors.value = { name: "", appointmentDate: "", appointmentTime: "" };
    } catch (e) {
      console.log(e);
    } finally {
      isLoading.value = false;
    }
  }
};

// const submitForm = async (data) => {
//   const response = await $fetch("/api/form", {
//     method: "POST",
//     body: form.value,
//   });
//   console.log("Server response:", response);
// };
</script>

<template>
  <form @submit.prevent="validateForm">
    <div class="input-container">
      <input v-model="name" class="input" placeholder="Adınız" />
      <span v-if="errors.name" class="text-error">{{ errors.name }}</span>
    </div>

    <div class="input-container">
      <label for="appointmentDate" class="block font-medium text-gray-700 text-sm"
        >Randevu Tarihi</label
      >
      <select v-model="appointmentDate">
        <option value="">Tarih Seçin</option>
        <option v-for="slot in slots" :key="slot.date + slot.time" :value="slot.date">
          {{ slot.date }}
        </option>
      </select>
      <span v-if="errors.appointmentDate" class="text-error">{{ errors.appointmentDate }}</span>
    </div>

    <div class="input-container">
      <select v-model="appointmentTime">
        <option value="">Saat Seçin</option>
        <option v-for="slot in filteredTimes" :key="slot.time" :value="slot.time">
          {{ slot.time }}
        </option>
      </select>
      <span v-if="errors.appointmentTime" class="text-error">{{ errors.appointmentTime }}</span>
    </div>

    <button :disabled="isLoading">
      <span v-if="isLoading"> Randevunuz Kaydediliyor... </span>
      <span v-else> Kaydet </span>
    </button>
    <span v-if="errors.appointmentDate"
      >Beklenmeyen bir hata oluştu. Kontrol edip tekrar deneyin.</span
    >
  </form>
</template>

<style scoped>
form {
  @apply bg-stone-100 shadow-lg shadow-slate-400 flex flex-col gap-6 mx-auto p-8 rounded-lg w-full max-w-2xl hover:scale-[1.02] transition duration-500;
}
input,
select {
  @apply px-4 py-2 border-2 rounded-lg w-full text-center;
}
button {
  @apply bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed p-4 rounded-lg w-full text-white;
}

.input-container {
  @apply flex flex-col justify-between;
}

.text-error {
  @apply font-semibold text-red-600 text-sm;
}
</style>
