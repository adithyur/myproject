const express = require("express");
const router = express.Router();
const Products = require('../Models/products');
const multer = require('multer');
const path = require('path');
const { request } = require("http");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/image');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/addproduct', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const { userid,productName, price, productType, category, brand, description } = req.body;
    const { image } = req.files;
    const imagePath = image[0].path;
    const products = new Products({ userid,productName, price, productType, category, brand, image: imagePath, description });
    await products.save();
    res.status(201).json(products);
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).json({ message: error });
  }
});

router.get('/getproduct',async(req,res)=>{
  try{
      const product=await Products.find()
      res.status(201).json(product);
  }
  catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ message: error });
  }
})

router.get('/getproductbyuserid/:userid',async(req,res)=>{
  try{
      const{userid}=req.params;
      const product=await Products.find({userid})
      res.status(201).json(product);
  }
  catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ message: error });
  }
})

router.get('/getcategory/:category',async(req,res)=>{
  try{
      const{category}=req.params
      const product=await Products.find({category})
      res.status(201).json(product);
  }
  catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ message: error });
  }
})

router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ message: error });
  }
});

router.delete('/deleteproduct/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    await Products.findByIdAndDelete(productid);
    res.status(200).json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/edit/:productid', async (req, res) => {
  try {
    const { productid } = req.params;
    const { productName, price, productType, category, brand, description } = req.body;
    
    const updatedProduct = await Products.findOneAndUpdate(
      { _id: productid }, // Filter criteria
      { productName, price, productType, category, brand, description }, // Update data
      { new: true } // To return the updated document
    );

    if (updatedProduct) {
      // The product was found and updated
      res.status(200).json(updatedProduct);
    } else {
      // Product not found
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/unproducts', async (req, res) => {
  try {
    const unverifiedProducts = await Products.find({ status: 'unverified' });
    res.json(unverifiedProducts);
  } catch (error) {
    console.error('Error fetching unverified products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/veproducts', async (req, res) => {
  try {
    const verifiedProducts = await Products.find({ status: 'verified' });
    res.json(verifiedProducts);
  } catch (error) {
    console.error('Error fetching verified products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/unupdate/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(
      productId,
      { $set: updatedProductData },
      { new: true }
    );

    if (updatedProduct) {
      // Product status updated successfully
      res.status(200).json(updatedProduct);
    } else {
      // Product not found
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
