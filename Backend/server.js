
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const propertyRoutes = require('./routes/propertyRoutes');

const port = 5000;

const cors = require('cors');
app.use(cors());


app.use(express.json());


app.use('/api', propertyRoutes);


mongoose.connect('mongodb://localhost:27017/Sudiptodb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});