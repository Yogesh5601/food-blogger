import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: Number, required: true, unique: true },
  password: {
    type: String,
  },
});

const User = new mongoose.model("User", userSchema);
export default User;
