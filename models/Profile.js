import mongoose, { Schema } from "mongoose";
import User from "./User";

const profileSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    country: String,
    city: String,
    address: String,
    email: String,
    phoneNumber: String,
    birthday: String,
    organization: String,
    role: String,
    department: String,
    zipCode: String,
    skills: Array,
    education: Array,
    experience: Array,
    language: Array,
  },
  { strict: false }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
