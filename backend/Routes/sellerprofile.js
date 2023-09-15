const express = require("express");
const router = express.Router();
const SellerProfile = require('../Models/sellerprofile');
router.post('/sellerprofile', async (req, res) => {
    try {
      const { userid,name,mobile1,pincode,place,address,city,state,landmark,mobile2 } = req.body;
      const sellerprofile = new SellerProfile({ userid,name,mobile1,pincode,place,address,city,state,landmark,mobile2 });
      await sellerprofile.save();
      res.status(201).json(sellerprofile);
    } catch (error) {
      console.error('Error inserting details:', error);
    
    }
  }); 

  router.get('/sellerprofile/:userid', async(req, res) => {
    try{
      const {userid}= req.params;
      const sellerprofile=await SellerProfile.find({userid:userid})
      res.status(201).json(sellerprofile);
  }
  catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ message: error });
  }
    }
  )

  router.post('/update/:userid', async (req, res) => {
    try {
      const { userid } = req.params;
      const { name,mobile1,pincode,place,address,city,state,landmark,mobile2 } = req.body;

      const existingProfile = await SellerProfile.findOne({ userid });

    if (existingProfile) {
      
      existingProfile.name = name;
      existingProfile.mobile1 = mobile1;
      existingProfile.pincode = pincode;
      existingProfile.place = place;
      existingProfile.address = address;
      existingProfile.city = city;
      existingProfile.state = state;
      existingProfile.landmark = landmark;
      existingProfile.mobile2 = mobile2;

      const updatedProfile = await existingProfile.save();
      res.status(200).json(updatedProfile);
    } else {
      // Create a new profile
      const newProfile = new SellerProfile({
        userid,
        name,
        mobile1,
        pincode,
        place,
        address,
        city,
        state,
        landmark,
        mobile2
      });

      const savedProfile = await newProfile.save();
      res.status(201).json(savedProfile);
    }
  } catch (error) {
    console.error('Error updating or creating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
  

  module.exports = router;