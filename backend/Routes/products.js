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

router.post('/addproduct',upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        sellerid,
        productName,
        price,
        productType,
        category,
        brand,
        description,
        quantity
      } = req.body;

      // Check if all image fields are provided
      if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4) {
        return res.status(400).json({ message: 'All four images are required.' });
      }

      const { image1, image2, image3, image4 } = req.files;

      const product = new Products({
        sellerid,
        productName,
        price,
        productType,
        category,
        brand,
        image: image1[0].path,
        image2: image2[0].path,
        image3: image3[0].path,
        image4: image4[0].path,
        description,
        quantity
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.error('Error inserting product:', error);
      res.status(500).json({ message: error });
    }
  }
);


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
      const product=await Products.find({category, status: 'verified'})
      res.status(201).json(product);
  }
  catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ message: error });
  }
})

router.get('/gettype/:productType',async(req,res)=>{
  try{
      const{productType}=req.params
      const product=await Products.find({productType, status: 'verified'})
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
    const products = await Products.find({ category, productType, status: 'verified' });

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

router.put('/updateproduct/:productId', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 }
]),
async (req, res) => {
  try {
    const { productId } = req.params;
    const {

      productName,
      price,
      productType,
      category,
      brand,
      description,
      quantity
    } = req.body;

    // Check if at least one image field is provided
    if (!req.files ) {
      return res.status(400).json({ message: 'At least one image is required for update.' });
    }

    const { image1, image2, image3, image4 } = req.files;

    // Fetch the existing product
    const existingProduct = await Products.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Update product data
    
    existingProduct.productName = productName;
    existingProduct.price = price;
    existingProduct.productType = productType;
    existingProduct.category = category;
    existingProduct.brand = brand;
    existingProduct.description = description;
    existingProduct.quantity = quantity;

    // Update images only if available
    if (image1) existingProduct.image = image1[0].path;
    if (image2) existingProduct.image2 = image2[0].path;
    if (image3) existingProduct.image3 = image3[0].path;
    if (image4) existingProduct.image4 = image4[0].path;

    await existingProduct.save();
    res.status(200).json(existingProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: error });
  }
}
);


router.get('/searchdata/:searchdata',async(req,res)=>{
  const {searchdata}=req.params 
  const regex = new RegExp(searchdata, 'i');

    const product = await Products.find({
      $or: [
        { productName: { $regex: regex } },
        { brand: { $regex: regex } },
        { category: { $regex: regex } },
        { description: { $regex: regex } },
      
      ],
    });
    res.json(product);
})


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

router.put('/updateQuantityminus/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    // Parse quantity as an integer
    const parsedQuantity = parseInt(quantity);
console.log(quantity)
    // Find the product by ID
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < parsedQuantity) {
      return res.status(400).json({ message: 'Not enough available quantity' });
    }

    // Subtract the parsedQuantity from the product's quantity
    product.quantity -=quantity;
  

    // Save the updated product
    await product.save();

    return res.status(200).json({ message: 'Quantity updated successfully', updatedProduct: product });
  } catch (error) {
    console.error('Error updating quantity:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/countProducts', async (req, res) => {
  try {
    const productCount = await Products.countDocuments({ status: 'verified' });
    res.json({ count: productCount });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
