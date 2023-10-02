const mongoose = require('mongoose');

const Rental = mongoose.model('Rental',new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer",
    },
    movies: {
        type:mongoose.Schema.ObjectId,
        ref: "Movies",
    },
    dateOut:{
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned:{
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }

    }));
    
exports.Rental = Rental;