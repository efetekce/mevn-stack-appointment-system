import Slot from "./server/models/Slot.js";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
const seedSlots = async () => {
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

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000,
    });
    await Slot.deleteMany();
    await Slot.insertMany(temp);
    console.log("Slots seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding slots:", error);
    process.exit(1);
  }
};

seedSlots();
