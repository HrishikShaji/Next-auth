import mongoose, { Schema } from "mongoose";
import Profile from "./Profile";

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    profile: { type: Schema.Types.ObjectId, ref: "Profile" },
    profileImage: String,
    authId: String,
  },
  { strict: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
