const express = require("express");
const router = express.Router();
const Transaction = require('../Models/transaction');

router.post('/transaction', async (req, res) => {
  try {
    const { userid, amount, mode } = req.body;

    const transaction = new Transaction({ userid,  amount, mode });
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.error('transaction error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;