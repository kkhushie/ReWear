const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profileImage: {
    type: String,
    default: "", // Cloudinary URL or static path
  },
  bio: {
    type: String,
    maxlength: 250,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  socialLinks: {
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    website: { type: String, default: "" },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  points: {
    type: Number,
    default: 100, // Starting points for new users
  },
  myListings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
  ],
  swaps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Swap", // If you plan to track item swaps
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
