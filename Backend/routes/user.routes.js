const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase.model');
const Product = require('../models/product.model');

router.get('/:userId/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.find({ buyer: req.params.userId }).populate('product');

    const purchasedProducts = purchases.map((p) => p.product); // extract just the products
    res.json(purchasedProducts);
  } catch (err) {
    console.error("Error fetching purchases", err);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

module.exports = router;
