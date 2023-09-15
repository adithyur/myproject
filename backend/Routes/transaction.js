const express = require("express");
const router = express.Router();
const Transaction = require('../Models/transaction');
const Order = require('../Models/order');
const path = require('path');

// Route to create a new transaction
router.post('/createTransaction', async (req, res) => {
  try {
    const { userid, orderid, mode } = req.body;

    // Find the order with the given orderid to retrieve the amount
    const order = await Order.findOne({ _id: orderid });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const amount = order.total;

    const newTransaction = new Transaction({
      userid,
      orderid,
      amount,
      mode,
      date: new Date(),
    });
    await newTransaction.save();

    res.status(201).json({ message: 'Transaction created successfully', transactionId: newTransaction._id });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/cod', async (req, res) => {
  try {
    const { userid, orderid, mode } = req.body;

    // Find the order with the given orderid to retrieve the amount
    const order = await Order.findOne({ _id: orderid });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const amount = order.total;

    const newTransaction = new Transaction({
      userid,
      orderid,
      amount,
      mode,
      date: new Date(),
      status: 'unpaid',
    });
    
    await newTransaction.save();

    res.status(201).json({ message: 'Transaction created successfully', transactionId: newTransaction._id });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getTransactionId/:orderid', async (req, res) => {
  try {
    const { orderid } = req.params;

    const transaction = await Transaction.findOne({ orderid });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found for the given order ID' });
    }

    res.status(200).json({ transactionId: transaction._id });
  } catch (error) {
    console.error('Error fetching transaction ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getTransactionDetails/:orderid', async (req, res) => {
  try {
    const { orderid } = req.params;
    const transaction = await Transaction.findOne({ orderid });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found for the given order ID' });
    }

    const transactionDetails = {
      transactionId: transaction._id,
      amount: transaction.amount,
      mode: transaction.mode,
      status: transaction.status,
      date: transaction.date
    };

    res.status(200).json(transactionDetails);
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;