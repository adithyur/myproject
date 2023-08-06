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
  },
  price: {
    type: String,
    required: true
  },

    name: {
        type: String,
        required: true
    },
    mobile1: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    mobile2: {
        type: String,
    },

});

orderSchema.index({ userid: 1, productid: 1 }, { unique: true });

module.exports = mongoose.model('order', orderSchema);
