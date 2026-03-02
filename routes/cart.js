const express = require('express');
const router = express.Router();
const checkAuth = require('../utils/checkAuth');
const Cart = require('../models/Cart');

router.put('/', checkAuth, async (req, res) => {
  try {
    const { items } = req.body; 
    await Cart.findOneAndUpdate(
      { user: req.userId },
      { items },
      { upsert: true, returnDocument: 'after' }
    );
    res.json({ message: 'Cart synced' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to sync cart' });
  }
});


router.get('/', checkAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate('items.item');
    res.json(cart ? cart.items.map(i => i.item) : []);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get cart' });
  }
});

module.exports = router;