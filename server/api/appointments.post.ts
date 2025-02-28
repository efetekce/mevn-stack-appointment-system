import connectDB from "../db/db";
import Appointment from "../models/Appointment";

export default defineEventHandler(async (event) => {
  await connectDB();
  const body = await readBody(event);

  try {
    const appointment = new Appointment(body);
    await appointment.save();

    const allAppointments = await Appointment.find();
    return { msg: "ok", data: allAppointments };
  } catch (error) {
    console.error(error);
    return { msg: "error" };
  }
});
// app.post("/api/appointments", (req, res) => {
//     const d = req.body;
//     console.log("data:", d);

//     const db = getDb();
//     db.run(
//       "INSERT INTO appointments (date, time, name) VALUES (?, ?, ?)",
//       [d.date, d.time, d.name],
//       function (err) {
//         if (err) {
//           console.log("error:", err);
//           res.status(500).json({ msg: "error" });
//         } else {
//           db.all("SELECT * FROM appointments", [], (err, rows) => {
//             if (err) {
//               console.log("error:", err);
//               res.status(500).json({ msg: "error" });
//             } else {
//               console.log("all data:", rows);
//               res.json({ msg: "ok", data: rows });
//             }
//             db.close();
//           });
//         }
//       }
//     );
//   });
