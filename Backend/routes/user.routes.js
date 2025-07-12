const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase.model');
const Product = require('../models/product.model');

const User = require('../models/user.model'); // Adjust path if needed

// GET /api/users/:userId - Get user details by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



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
