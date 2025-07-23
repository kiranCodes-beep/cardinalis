const Cart = require('../models/Cart');
const mongoose = require('mongoose');

// GET /api/cart/:userId
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart/:userId (add or update items)
exports.addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    const { productId, name, price, quantity, image } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const existing = cart.items.find(item => item.productId.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, name, price, quantity, image });
    }
    await cart.save();
    res.status(201).json({ message: 'Added to cart', cart });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:userId/:itemId
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    res.json({ message: 'Removed from cart', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/cart/:userId/:itemId (update quantity)
exports.updateQuantity = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.quantity = quantity;
    await cart.save();
    res.json({ message: 'Quantity updated', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart/merge/:userId (merge local cart with backend cart)
exports.mergeCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { items } = req.body; // items: [{productId, name, price, quantity}]
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    items.forEach(localItem => {
      const existing = cart.items.find(item => item.productId.toString() === localItem.productId);
      if (existing) {
        existing.quantity += localItem.quantity;
      } else {
        cart.items.push(localItem);
      }
    });
    await cart.save();
    res.json({ message: 'Cart merged', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 