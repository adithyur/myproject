const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
});

module.exports = mongoose.model('transaction', transactionSchema);
