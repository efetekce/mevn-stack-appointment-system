<script setup lang="ts">
interface GlobalData {
  name: string;
  date: string;
  time: string;
  slots: Slot[];
  appointments: Appointment[];
}
interface Slot {
  date: string;
  time: string;
}
interface Appointment {}
const loading = ref(false);
const router = useRouter();
const data = useState<GlobalData>("data", () => ({
  name: "",
  date: "",
  time: "",
  slots: [],
  appointments: [],
}));
const { name, date, time, slots, appointments } = data.value;
onMounted(() => {
  fetchData();
  fetchSlots();

  // setInterval(() => {
  //   console.log("polling...");
  //   fetchData();
  // }, 5000);
});

const filteredTimes = computed(() => {
  if (!data.value.date) return [];
  const temp = data.value.slots.filter((slot) => slot.date === data.date);
  console.log("filtered times:", temp);
  return temp;
});
const fetchData = async () => {
  const response = await fetch("http://localhost:3000/appointments");
  const appointmentData = await response.json();
  console.log("appointments:", appointmentData);
  data.appointments = appointmentData;
};

const fetchSlots = async () => {
  const response = await $fetch("http://localhost:3000/slots");
  const slotData = await response.json();
  console.log("slots:", slotData);
  data.slots = slotData;
};
const save = async () => {
  const response = await fetch("http://localhost:3000/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      date: data.date,
      time: data.time,
    }),
  });
  const savedData = await response.json();
  console.log("save response:", savedData);
  // refreshNuxtData();
  // location.reload();
};
</script>

<template>
  <div class="containerdiv">
    <!-- Bad practice: Inline styles everywhere -->
    <h1>Randevu Sistemi</h1>

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
        v-model="data.name"
        style="
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        "
        class="input"
        placeholder="Adınız"
      />

      <!-- Bad practice: Poor variable names -->
      <select
        v-model="data.date"
        style="
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        "
      >
        <option value="">Tarih Seçin</option>
        <option v-for="s in data.slots" :key="s.date + s.time" :value="s.date">
          {{ s.date }}
        </option>
      </select>

      <select
        v-model="data.time"
        style="
          width: 100%;
          padding: 8px;
          margin-bottom: 10px;
          border: 1px solid #ddd;
        "
      >
        <option value="">Saat Seçin</option>
        <option
          v-for="slot in filteredTimes"
          :key="slot.time"
          :value="slot.time"
        >
          {{ slot.time }}
        </option>
      </select>

      <!-- Bad practice: No loading states or error handling -->
      <button
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
      </button>
    </form>

    <!-- Bad practice: No pagination or filtering -->
    <div
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
      <div
        v-for="appointment in data.appointments"
        :key="appointment.id"
        style="padding: 10px; border-bottom: 1px solid #ddd"
      >
        {{ appointment.name }} - {{ appointment.date }} {{ appointment.time }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
