const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const favoriteRoutes = require('./routes/favorites');
const cartRoutes = require('./routes/cart');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/items', itemsRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('Backend API is running...');
});


const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
};

start();