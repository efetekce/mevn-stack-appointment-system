import connectDB from "../db/db";
import Appointment from "../models/Appointment";

export default defineEventHandler(async () => {
  // await connectDB();
  const appointments = await Appointment.find({}, "date time");

  let temp = [];
  for (let i = 28; i <= 29; i++) {
    for (let h = 13; h <= 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        let d = `2024-02-${i}`;
        let t = `${h}:${m === 0 ? "00" : m}`;
        temp.push({ date: d, time: t });
      }
    }
  }
  for (let i = 1; i <= 3; i++) {
    for (let h = 13; h <= 17; h++) {
      for (let m = 0; m < 60; m += 30) {
        let d = `2024-03-0${i}`;
        let t = `${h}:${m === 0 ? "00" : m}`;
        temp.push({ date: d, time: t });
      }
    }
  }

  // const uniqueDates = [...new Set(temp.map((slot) => slot.date))];
  const available = temp.filter((slot) => {
    return !appointments.some((a) => a.date === slot.date && a.time === slot.time);
  });

  // const available = temp.reduce<string[]>((acc, slot) => {
  //   if (
  //     !appointments.some((a) => a.date === slot.date && a.time === slot.time) &&
  //     !acc.includes(slot.date)
  //   ) {
  //     acc.push(slot.date);
  //   }
  //   return acc;
  // }, []);

  // console.log("available slots:", available);
  // console.log(uniqueDates);
  return available;
});
