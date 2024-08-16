const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const auth = require('../middleware/auth');


router.post('/', auth, async (req, res) => {
  try {
    const { name, price } = req.body;
    const newItem = new Item({
      name,
      price,
      seller: req.user.id,
    });

    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/unsold', async (req, res) => {
  try {
    const items = await Item.find({ sold: false }).populate('seller', 'username');
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/my-items', auth, async (req, res) => {
  try {
    const items = await Item.find({ seller: req.user.id });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/my-purchases', auth, async (req, res) => {
  try {
    const items = await Item.find({ buyer: req.user.id });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.put('/purchase/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.sold) {
      return res.status(400).json({ msg: 'Item already sold' });
    }

    if (item.seller.toString() === req.user.id) {
      return res.status(400).json({ msg: 'You cannot buy your own item' });
    }

    item.sold = true;
    item.buyer = req.user.id;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
