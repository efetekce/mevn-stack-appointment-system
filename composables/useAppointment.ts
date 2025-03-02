import type { Appointment, GlobalState, Slot } from "~/types/types";

export const useAppointment = () => {
  const state = useState<GlobalState>("data", () => ({
    name: "",
    date: "",
    time: "",
    slots: [],
    appointments: [],
    isLoading: false,
  }));

  const filteredTimes = computed(() => {
    if (!state.value.date) return [];
    const temp = state.value.slots.filter((slot) => slot.date === data.value.date);
    console.log("filtered times:", temp);
    return temp;
  });

  const fetchAppointments = async () => {
    if (state.value.isLoading) return;
    try {
      state.value.isLoading = true;
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const appointmentData = await $fetch<Appointment[]>("/api/appointments");
      state.value.appointments = appointmentData;
      console.log("appointments:", state.value.appointments);
    } catch (error) {
      console.log(error);
    } finally {
      state.value.isLoading = false;
    }
  };

  const fetchSlots = async () => {
    if (state.value.isLoading) return;
    try {
      state.value.isLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const slotData = await $fetch<Slot[]>("/api/slots");
      state.value.slots = slotData;
      console.log(state.value.slots);
    } catch (e) {
      console.log(e);
    } finally {
      state.value.isLoading = false;
    }
  };

  const saveAppointment = async () => {
    const response = await $fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        date: date,
        time: time,
      }),
    });
    const savedData = await response.json();
    console.log("save response:", savedData);
    // refreshNuxtData();
    // location.reload();
  };

  return {
    name: computed(() => state.value.name),
    appointmentDate: computed(() => state.value.date),
    appointmentTime: computed(() => state.value.time),
    appointments: computed(() => state.value.appointments),
    slots: computed(() => state.value.slots),
    isLoading: computed(() => state.value.isLoading),
    fetchSlots,
    fetchAppointments,
    filteredTimes,
    saveAppointment,
  };
};
