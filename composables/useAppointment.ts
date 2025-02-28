import type { Appointment, GlobalState, Slot } from "~/types/types";

export const useAppointment = () => {
  const data = useState<GlobalState>("data", () => ({
    name: "",
    date: "",
    time: "",
    slots: [],
    appointments: [],
    isLoading: false,
  }));

  //   const {
  //     name: userName,
  //     date: appointmentDate,
  //     time: appointmentTime,
  //     slots,
  //     appointments,
  //   } = toRefs(data.value);

  const filteredTimes = computed(() => {
    if (!data.value.date) return [];
    const temp = data.value.slots.filter((slot) => slot.date === data.value.date);
    console.log("filtered times:", temp);
    return temp;
  });

  const fetchData = async () => {
    if (data.value.isLoading) return;
    data.value.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const appointmentData = await $fetch<Appointment[]>("/api/appointments");
      data.value.appointments = appointmentData;
      console.log("appointments:", data.value.appointments);
    } catch (error) {
      console.log(error);
    } finally {
      data.value.isLoading = false;
    }
  };

  const fetchSlots = async () => {
    if (data.value.isLoading) return;
    data.value.isLoading = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const slotData = await $fetch<Slot[]>("/api/slots");
      data.value.slots = slotData;
      console.log(data.value.slots);
    } catch (e) {
      console.log(e);
    } finally {
      data.value.isLoading = false;
    }
  };

  const save = async () => {
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
    ...toRefs(data.value),
    fetchSlots,
    fetchData,
    filteredTimes,
  };
};
