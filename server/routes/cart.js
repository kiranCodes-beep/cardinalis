const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /api/cart/:userId
router.get('/:userId', cartController.getCart);
// POST /api/cart/:userId
router.post('/:userId', cartController.addToCart);
// DELETE /api/cart/:userId/:itemId
router.delete('/:userId/:itemId', cartController.removeFromCart);
// PATCH /api/cart/:userId/:itemId
router.patch('/:userId/:itemId', cartController.updateQuantity);
// POST /api/cart/merge/:userId
router.post('/merge/:userId', cartController.mergeCart);

module.exports = router; 