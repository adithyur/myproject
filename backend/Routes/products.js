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

module.exports = router;
