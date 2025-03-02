import type { Appointment, AppointmentData, GlobalState, Slot } from "~/types/types";

export const useAppointmentStore = () => {
  const state = useState<GlobalState>("data", () => ({
    name: "",
    appointmentDate: "",
    appointmentTime: "",
    slots: [],
    appointments: [],
    isLoading: false,
    showList: false,
  }));

  const filteredTimes = computed(() => {
    if (!state.value.appointmentDate) return [];
    const timeSlots = state.value.slots.filter((slot) => slot.date === state.value.appointmentDate);
    console.log("filtered times:", timeSlots);
    return timeSlots;
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
      console.log(state.value.slots);
    }
  };

  const saveAppointment = async (formData: AppointmentData) => {
    const response = await $fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        date: formData.date,
        time: formData.time,
      }),
    });

    console.log("save response:", response);
    await fetchSlots();
  };

  return {
    // name: state.value.name,
    // appointmentDate: state.value.date,
    // appointmentTime: state.value.time,
    // appointments: state.value.appointments,
    // slots: state.value.slots,
    // isLoading: state.value.isLoading,
    state,
    fetchSlots,
    fetchAppointments,
    filteredTimes,
    saveAppointment,
  };
};
