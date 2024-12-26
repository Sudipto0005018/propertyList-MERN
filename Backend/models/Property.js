const mongoose = require('mongoose');


const propertySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    required: true
  }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;