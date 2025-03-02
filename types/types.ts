export interface GlobalState {
  name: string;
  appointmentDate: string;
  appointmentTime: string;
  slots: Slot[];
  appointments: Appointment[];
  isLoading: boolean;
  showList: boolean;
}
export interface Slot {
  date: string;
  time: string;
}
export interface Appointment {
  id: string;
  name: string;
  date: string;
  time: string;
}

export type AppointmentData = Pick<Appointment, "name" | "time" | "date">;
