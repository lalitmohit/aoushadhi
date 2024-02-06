import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, trim: true },
    lname: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    profileImage: { type: String, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    user_id: { type: String, required: true, unique: true, trim: true },
    cart_id: { type: String, unique: true, trim: true },
    total_quantity: { type: String, unique: false, trim: true },
    total_price: { type: String, unique: false, trim: true },
    password: { type: String, trim: true },
    address: {
      shipping: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        pincode: { type: Number, trim: true },
      },
      billing: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        pincode: { type: Number, trim: true },
      },
    }
  },
  { timestamps: true }
);


export const userModel = mongoose.model("lalit", userSchema);

