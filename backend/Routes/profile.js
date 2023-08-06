const express = require("express");
const router = express.Router();
const Profile = require('../Models/profile');
router.post('/profile', async (req, res) => {
    try {
      const { userid,name,mobile1,pincode,place,address,city,state,landmark,mobile2 } = req.body;
      const profile = new Profile({ userid,name,mobile1,pincode,place,address,city,state,landmark,mobile2 });
      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      console.error('Error inserting details:', error);
    
    }
  }); 

  router.get('/profile/:userid', async(req, res) => {
    try{
      const {userid}= req.params;
      const profile=await Profile.find({userid:userid})
      res.status(201).json(profile);
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
      
      const updatedProfile = await Profile.findOneAndUpdate(
        { userid: userid }, // Filter criteria
        { name,mobile1,pincode,place,address,city,state,landmark,mobile2 }, // Update data
        { new: true } // To return the updated document
      );
  
      if (updatedProfile) {
        // The profile was found and updated
        res.status(200).json(updatedProfile);
      } else {
        // Profile not found
        res.status(404).json({ message: "Profile not found" });
      }
    } catch (error) {
      console.error('Error inserting details:', error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  module.exports = router;