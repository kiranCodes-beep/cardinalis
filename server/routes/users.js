const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// GET /api/users
router.get('/', usersController.getAllUsers);
// POST /api/users
router.post('/', usersController.createUser);
// GET /api/users/login
router.get('/login', usersController.loginUser);
// GET /api/users/:userId/cart
router.get('/:userId/cart', usersController.getCart);
// PUT /api/users/:userId/cart
router.put('/:userId/cart', usersController.updateCart);

module.exports = router; 