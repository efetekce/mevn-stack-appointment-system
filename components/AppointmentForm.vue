<script setup lang="ts">
const loading = ref(false);

const {
  name: userName,
  date: appointmentDate,
  time: appointmentTime,
  slots,
  filteredTimes,
} = useAppointment();
</script>

<template>
  <!-- Bad practice: No form validation -->
  <form
    style="
      max-width: 600px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    "
  >
    <input
      v-model="userName"
      style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd"
      class="input"
      placeholder="Adınız"
    />

    <!-- Bad practice: Poor variable names -->
    <select
      v-model="appointmentDate"
      style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd"
    >
      <option value="">Tarih Seçin</option>
      <option v-for="s in slots" :key="s.date + s.time" :value="s.date">
        {{ s.date }}
      </option>
    </select>

    <select
      v-model="appointmentTime"
      style="width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ddd"
    >
      <option value="">Saat Seçin</option>
      <option v-for="slot in filteredTimes" :key="slot.time" :value="slot.time">
        {{ slot.time }}
      </option>
    </select>

    <!-- Bad practice: No loading states or error handling -->
    <!-- <button
      @click="save"
      style="
        width: 100%;
        padding: 10px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      "
    >
      Kaydet
    </button> -->
  </form>
</template>

<style scoped></style>
