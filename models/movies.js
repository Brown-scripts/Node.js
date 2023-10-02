const mongoose  = require('mongoose');

const Movies =mongoose.model('Movies',new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: mongoose.Schema.ObjectId,
        ref: "Genre",
        required: true
    },
    numberInStock:{
        type:Number,
        required: true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
}));

exports.Movies= Movies;
