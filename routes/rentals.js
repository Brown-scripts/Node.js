const {Rental}= require('../models/rental');
const {Movies} = require('../models/movies');
const {Customer} = require('../models/customer');
const express  = require('express');
const router  = express.Router();

router.get('/',async(req,res)=>{
    const rental = await Rental.find().populate('customer movies').sort();
    res.send(rental);
});

router.post('/',async(req,res)=>{
    const customer = await Customer.findById(req.body.customer);
    const movies = await Movies.findById(req.body.movies);
    if (!customer) return res.status(400).send('Invalid customer');
    if (!movies) return res.status(400).send('Invalid movie');

    if (movies.numberInStock===0) return res.status(400).send('Movie not in stock')

    let rental=new Rental({
        customer: req.body.customer,
        movies: req.body.movies
    });

    rental = await rental.save();

    movies.numberInStock--;
    movies.save();

    res.send(rental);

});

router.put('/:id',async(req,res)=>{
    if (error) return res.status(400).send(error.details[0].message);

    const rental = await Rental.findByUpdate(req.params.id,{name : req.body.name},{
        new: true
    });

    if (!rental) return res.status(404).send('The Genre with the given ID does not exist');

    res.send(rental);
});

router.delete('/:id',async(req,res)=>{
    const rental = await Rental.findByAndRemove(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID does not exist');
    res.send(rental);
});

router.get('/:id',async(req,res)=>{
    const rental = await findById(req.params.id);

    if (!rental) return res.status(404).send('The rental with the given ID does not exist');
    res.send(rental);
});

module.exports= router;