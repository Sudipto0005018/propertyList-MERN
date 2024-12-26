
//This file contains CONTROLLER logic. kept both controller as well as router in this file

const express = require('express');
const Property = require('../models/Property');

const router = express.Router();


router.get('/properties', async (req, res) => {
  const { location, type, sortByPrice } = req.query;

  try {
    let filter = {};

    if (location) {
      filter.location = location;
    }
    if (type) {
      filter.type = type;
    }
    filter.availability = true; 

  
    let properties = await Property.find(filter);
    
    if (sortByPrice) {
      properties = properties.sort((a, b) => (sortByPrice === 'asc' ? a.price - b.price : b.price - a.price));
    }

    //properties.sort(func(a,b) =>{return a-b})

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching properties' });
  }
});

router.post('/properties', async (req, res) => {
  try {
    const { location, price, type, availability } = req.body;

    const property = new Property({
      location,
      price,
      type,
      availability
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating property' });
  }
});

module.exports = router;