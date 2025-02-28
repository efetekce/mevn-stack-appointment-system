import connectDB from "../db/db";
import Appointment from "../models/Appointment";

export default defineEventHandler(async () => {
  await connectDB();

  try {
    const appointments = await Appointment.find();
    return appointments;
  } catch (error) {
    console.error(error);
    return { msg: "error" };
  }
});
// app.get("/api/appointments", (req, res) => {
//     const db = getDb();
//     db.all("SELECT * FROM appointments", [], (err, rows) => {
//       if (err) {
//         console.log("error:", err);
//         res.status(500).json({ msg: "error" });
//       } else {
//         console.log("all appointments:", rows);
//         res.json(rows);
//       }
//       db.close();
//     });
//   });
