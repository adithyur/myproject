const express = require("express");
const router = express.Router();
const Cart = require('../Models/cart');
const products = require('../Models/products');
const path = require('path');

router.post('/cart', async (req, res) => {
    try {
      const { userid, productid } = req.body;
      const existingCart = await Cart.findOne({ userid, productid });
      if (existingCart) {
        return res.status(202).json({ message: 'Product already in cart' });
      }
  
      const cart = new Cart({ userid, productid });
      await cart.save();
  
      res.status(201).json(cart);
    } catch (error) {
      console.error('Error inserting cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.delete('/cart/:userid/:productid', async (req, res) => {
    try {
      const { userid, productid } = req.params;
      await Cart.deleteOne({ userid, productid });
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
      console.error('Error deleting product from cart:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.get('/cart/:userid/:productid', async (req, res) => {
    try {
      const { userid, productid } = req.params;
      const existingCart = await Cart.findOne({ userid, productid });
      res.status(200).json({ exists: !!existingCart });
    } catch (error) {
      console.error('Error fetching cart status:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  router.get('/getcartbyuserid/:userid', async (req, res) => {
    try {
      const { userid } = req.params;
      const carts = await Cart.find({ userid })
        .populate({ path: 'productid', model: 'Products' })
        .exec();
  
      const data = carts.map((cart) => ({
        productId: cart.productid._id,
        productDetails: cart.productid,
      
      }));
  
      res.status(200).json(data);
    } catch (error) {
      console.error('Error getting carts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  
  
  module.exports = router;
  
  
  