import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema(
  {
    username: String,
    email: String,
    profileImage: String,
  },
  { strict: false }
);

const Account =
  mongoose.models.Account || mongoose.model("Account", userSchema);

export default User;
