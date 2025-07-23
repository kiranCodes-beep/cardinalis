const User = require('../models/User');
const bcrypt = require('bcrypt');

// Get all users (admin only, for now open)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Login: GET /api/users/login?email=...&name=...&password=...
exports.loginUser = async (req, res) => {
  const { email, password } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Register new user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, cart: [] });
    await newUser.save();
    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(400).json({error: err.message || 'Registration failed' });
  }
};

// Update user's cart
exports.updateCart = async (req, res) => {
  const { userId } = req.params;
  const { cart } = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { cart }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.cart || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
}; 