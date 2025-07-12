const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ['Men', 'Women', 'Kids', 'Footwear', 'Accessories'],
    required: true,
  },

  type: {
    type: String,
    enum: ['For Swap', 'Redeemable'],
    required: true,
  },

  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'Free Size'],
    required: true,
  },

  condition: {
    type: String,
    enum: ['New', 'Like New', 'Gently Used', 'Worn'],
    required: true,
  },

  tags: {
    type: [String],
    default: [],
  },

  color: {
    type: String,
  },

  pointsRequired: {
    type: Number,
    default: 0, // Only used for Redeemable items
  },

  images: {
    type: [String], // Can be Cloudinary URLs or static paths
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  approvedByAdmin: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);
