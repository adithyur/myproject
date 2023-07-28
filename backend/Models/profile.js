const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
   
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
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
    mobile1: {
        type: String,
        required: true
    },
    mobile2: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('profile', profileSchema);