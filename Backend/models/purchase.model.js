// models/Purchase.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  purchasedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Purchase', purchaseSchema);
