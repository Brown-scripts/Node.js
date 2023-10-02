const {Movies}= require('../models/movies');
const {Genre}= require('../models/genre');
const express  = require('express');
const router  = express.Router();

router.get('/',async(req,res)=>{
    const movies = await Movies.find().populate('genre').sort('name');
    res.send(movies);
});

router.post('/',async(req,res)=>{
    const genre = await Genre.findById(req.body.genre);
    if (!genre) return res.status(400).send('Invalid genre');

    let movies=new Movies({
        title: req.body.title,
        genre:req.body.genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    movies = await movies.save();
    res.send(movies);

});

router.put('/:id',async(req,res)=>{
    const movies = await Movies.findByUpdate(req.params.id,{name : req.body.name},{
        new: true
    });

    if (!movies) return res.status(404).send('The movies with the given ID does not exist');

    res.send(movies);
});

router.delete('/:id',async(req,res)=>{
    const movies = await Movies.findByAndRemove(req.params.id);

    if (!movies) return res.status(404).send('The movies with the given ID does not exist');
    res.send(movies);
});

router.get('/:id',async(req,res)=>{
    const movies = await findById(req.params.id);

    if (!movies) return res.status(404).send('The movies with the given ID does not exist');
    res.send(movies);
});

module.exports= router;

