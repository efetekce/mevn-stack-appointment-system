export interface GlobalState {
  name: string;
  date: string;
  time: string;
  slots: Slot[];
  appointments: Appointment[];
  isLoading: boolean;
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
