const express = require("express");
const router = express.Router();
const Profile = require('../Models/profile');
router.post('/profile', async (req, res) => {
    try {
      const { userid,fname,lname,address,pincode,city,state,mobile1,mobile2 } = req.body;
      const profile = new Profile({ userid,fname,lname,address,pincode,city,state,mobile1,mobile2 });
      await profile.save();
      res.status(201).json(user);
    } catch (error) {
      console.error('Error inserting details:', error);
    
    }
  }); 

  module.exports = router;