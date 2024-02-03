import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: false, trim: true },
    lname: { type: String, required: false, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    profileImage: { type: String, required: false, trim: true },
    phone: { type: String, required: true, unique: true },
    user_id: { type: String, required: true, unique: true },
    cart_id: { type: String, required: false, unique: true },
    total_quantity: { type: String, required: false, unique: true },
    total_price: { type: String, required: false, unique: true },
    password: { type: String, required: true, trim: true },
    address: {
      shipping: {
        street: { type: String, required: false, trim: true },
        city: { type: String, required: false, trim: true },
        pincode: { type: Number, required: false, trim: true },
      },
      billing: {
        street: { type: String, required: false, trim: true },
        city: { type: String, required: false, trim: true },
        pincode: { type: Number, required: false, trim: true },
      },
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("user", userSchema);
