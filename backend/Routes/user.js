const express = require("express");
const router = express.Router();
const User = require('../Models/user');
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
    
  module.exports = router;