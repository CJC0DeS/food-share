import mongoose from "mongoose";

const foodpostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    pickupAddress: {
      type: String,
      required: true,
    },
    mealType: {
      type: String,
    },
    primaryContact: {
      type: Number,
      required: true,
    },
    alternateContact: {
      type: Number,
    },
    servings: {
      type: Number,
    },
    hoursElapsed: {
      type: Number,
    },
    indeterminateServings: {
      type: String,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Foodpost = mongoose.model("Foodpost", foodpostSchema);

export default Foodpost;