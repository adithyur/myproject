const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
    required: true,
  },
  amount: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  status: {
    type: String,
    require: true,
    default: 'paid'
  },
  date: {
    type: Date
  }
});

module.exports = mongoose.model('transaction', transactionSchema);
