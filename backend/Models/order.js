const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  quantity: {
    type: String,
    required: true
  }
});

orderSchema.index({ userid: 1, productid: 1 }, { unique: true });

module.exports = mongoose.model('order', orderSchema);
