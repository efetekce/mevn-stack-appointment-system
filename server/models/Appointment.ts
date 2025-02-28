import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
});

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
