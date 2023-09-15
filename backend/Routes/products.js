const express = require("express");
const router = express.Router();
const Products = require('../Models/products');
const multer = require('multer');
const path = require('path');
const { request } = require("http");
const Review = require('../Models/review');
const User = require('../Models/user');

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

/*router.post('/addproduct', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }
    
    const { sellerid, productName, price, productType, category, brand, description, quantity } = req.body;
    const { image, image2, image3, image4 } = req.files;
    
    const imagePath = image[0].path;
    const image2Path = image2[0].path;
    const image3Path = image3[0].path;
    const image4Path = image4[0].path;

    const product = new Products({
      sellerid,
      productName,
      price,
      productType,
      category,
      brand,
      image: imagePath,
      image2: image2Path,
      image3: image3Path,
      image4: image4Path,
      description,
      quantity
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: error });
  }
});*/

router.post('/addproduct', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const { sellerid, productName, price, productType, category, brand, description } = req.body;
    const { image } = req.files;
    const imagePath = image[0].path;
    const products = new Products({ sellerid, productName, price, productType, category, brand, image: imagePath, description });
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

router.get('/getproductbyuserid/:sellerid',async(req,res)=>{
  try{
      const{sellerid}=req.params;
      const product=await Products.find({sellerid})
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

router.get('/products/:productType', async (req, res) => {
  try {
    const { productType } = req.params;

    const products = await Products.find({ productType });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found for the specified productType." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by productType:', error);
    res.status(500).json({ message: error });
  }
});

router.get('/products/:category/:productType', async (req, res) => {
  try {
    const { category, productType } = req.params;

    // Query the database to find products that match both category and productType
    const products = await Products.find({ category, productType });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error });
  }
});

router.post('/display/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Products.findById(productId);
    const seller = await User.findById(product.sellerid);
    const productDataWithSeller = {
      ...product.toObject(),
      sellerName: seller.name,
    };

    res.status(200).json(productDataWithSeller);
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

router.put('/edit/:productid', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const { productid } = req.params;
    const { productName, price, productType, category, brand, description } = req.body;
    
    // Check if 'image' exists in req.files
    const imagePath = req.files && req.files.image ? req.files.image[0].path : undefined;
    
    // Create an object with fields to update, excluding 'image' if it doesn't exist
    const updateFields = {
      productName,
      price,
      productType,
      category,
      brand,
      description,
    };
    
    // If 'image' exists, add it to the update fields
    if (imagePath) {
      updateFields.image = imagePath;
    }
    
    const updatedProduct = await Products.findOneAndUpdate(
      { _id: productid }, // Filter criteria
      updateFields, // Update data including the "image" field conditionally
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

/*router.post('/home', async (req, res) => {
  try {
    const verifiedProducts = await Products.find({ status: 'verified' });

    // Fetch reviews for each product in parallel
    const productsWithReviews = await Promise.all(
      verifiedProducts.map(async (product) => {
        const review = await Review.findOne({ productId: product._id });

        // Include the review in the product object or null if not found
        return {
          ...product.toObject(),
          review: review || null,
        };
      })
    );

    res.json(productsWithReviews);
  } catch (error) {
    console.error('Error fetching verified products with reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});*/




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
