const express = require("express");
const router = express.Router();
const Order = require('../Models/order');
const products = require('../Models/products');
const path = require('path');

router.post('/order', async (req, res) => {
    try {
      const { userid, productid, quantity } = req.body;
  
      const order = new Order({ userid, productid, quantity });
      await order.save();
  
      res.status(201).json(order);
    } catch (error) {
      console.error('Error inserting order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports = router;