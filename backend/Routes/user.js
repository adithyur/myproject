const express = require("express");
const router = express.Router();
const User = require('../Models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/reguser', async (req, res) => {
    try {
      const { name,email,password,trade } = req.body;
  
      const user = new User({ name:name, email:email, password:password, trade:trade });
  
      await user.save();
  
      res.status(201).json(user);
    } catch (error) {
      console.error('Error inserting user:', error);
    
    }
  }); 
  router.post('/login', async (req, res) => {
    try {
    
      const { email,password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(500).json({error: "Email/Password mismatch!"});
    
      const matched = await user.comparePassword(password);
      if (!matched) return res.status(404).json({error: "Email/Password mismatch!"});
      if (matched) return res.json( user);
    }
    catch (error) {
        console.error('Server Error', error);
        return res.status(500).json({error: " server error "});

      }

    });

    router.get('/getdetail/:userid',async(req,res)=>{
      try{
          const{userid}=req.params;
          const user=await User.find({userid})
          res.status(201).json(user);
      }
      catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ message: error });
      }
    })

    router.post('/viewuser', async (req, res) => {
    try {
      const roleuser = await User.find({ role: 'user' });
      res.json(roleuser);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/delete/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.get('/getname/:userid', async (req, res) => {
    try {
      const { userid } = req.params;
      const user = await User.findById(userid);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const username = user.name;
      const mailid =  user.email;
      res.status(200).json({ username , mailid});
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ message: error });
    }
  });

  router.put('/update-username/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const { newName } = req.body; // Assuming the new name is sent in the request body
  
      // Find the user by their ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's name
      user.name = newName;
      
      // Save the updated user
      await user.save();
  
      res.json({ message: 'User name updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/check-password/:userId/:password', async (req, res) => {
    try {
      const userId = req.params.userId;
      const password = req.params.password;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (isPasswordMatch) {
        res.status(200).json({ message: 'correct' });
      } else {
        res.status(200).json({ message: 'Password is incorrect' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.put('/updateEmail/:userid', async (req, res) => {
    const { userid } = req.params;
    const { newEmail } = req.body;
  
    try {
      
      if (!mongoose.isValidObjectId(userid)) {
        return res.status(400).json({ message: 'Invalid userid' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userid,
        { email: newEmail },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Email updated successfully' });
    } catch (error) {
      console.error('Error updating email:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.put('/updateTrade/:userid', async (req, res) => {
    try {
      const { userid } = req.params;
      const { trade } = req.body;
  
      // Find the user by ID and update the trade field
      const updatedUser = await User.findByIdAndUpdate(userid, { trade }, { new: true });
  
      if (updatedUser) {
        res.status(200).json({ message: 'Password updated successfully'});
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating trade:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  router.put('/updatePassword/:userid', async (req, res) => {
    try {
      const { userid } = req.params;
      const { newPassword } = req.body;
  
      // Validate inputs
      if (!newPassword) {
        return res.status(400).json({ message: 'New password is required' });
      }
  
      // Generate a salt and hash the new password
      const saltRounds = 10; // Number of salt rounds
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update the user's password in your database
      // ... Your database update code here ...
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



  module.exports = router;