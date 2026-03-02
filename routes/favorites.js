const express = require('express');
const router = express.Router();
const checkAuth = require('../utils/checkAuth');
const Favorite = require('../models/Favorite');

router.get('/', checkAuth, async (req, res) => {
  try {
 
    const favorites = await Favorite.find({ user: req.userId }).populate('item');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

router.post('/', checkAuth, async (req, res) => {

  try {
    const { itemId } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: 'itemId is required' });
    }

    const existing = await Favorite.findOne({ user: req.userId, item: itemId });


    if (existing) {
      await Favorite.findOneAndDelete({ _id: existing._id });
      return res.json({ added: false });
    }

    const doc = new Favorite({ 
        user: req.userId, 
        item: itemId 
    });
    
    await doc.save();
    res.json({ added: true });

  } catch (err) {
    console.error('!!! DATABASE ERROR:', err); 
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

module.exports = router;