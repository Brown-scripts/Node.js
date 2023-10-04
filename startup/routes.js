const express = require ('express');
const genre = require('../routes/genre');
const customer = require('../routes/customer');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const user = require('../routes/user');
const auth = require('../routes/auth');
const error=require('../middleware/error');


module.exports = function(app){
    app.use(express.json());
    app.use('/api/genre',genre);
    app.use('/api/rentals',rentals);
    app.use('/api/customer',customer);
    app.use('/api/movies',movies);
    app.use('/api/user',user);
    app.use('/api/auth',auth);
    app.use(error);

}