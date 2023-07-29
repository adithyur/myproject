const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['verified', 'unverified', 'rejected'],
        default: 'unverified'
    }

});

module.exports = mongoose.model('Products', productSchema);