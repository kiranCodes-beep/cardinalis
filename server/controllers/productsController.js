// Mock product data
const products = [
  { id: 1, name: 'T-shirt', price: 19.99 },
  { id: 2, name: 'Jeans', price: 49.99 },
  { id: 3, name: 'Sneakers', price: 89.99 }
];

exports.getAllProducts = (req, res) => {
  res.json(products);
}; 