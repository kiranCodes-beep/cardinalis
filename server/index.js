const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

// Replace local MongoDB connection with Atlas connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const usersRouter = require('./routes/users');
const stripeRoutes = require('./routes/stripe');
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/users', usersRouter);
app.use('/api/stripe', stripeRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});
app.get('/', (req, res) => {
  res.send('API Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 