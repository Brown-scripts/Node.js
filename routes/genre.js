const auth = require('../middleware/auth');
const admin= require('../middleware/admin');
const {Genre}= require('../models/genre');
const express  = require('express');
const router  = express.Router();

router.get('/',async(req,res)=>{
    const genre = await Genre.find().sort('name');
    res.send(genre);
});

router.post('/',auth,async(req,res)=>{
    let genre=new Genre({
        name: req.body.name});
    genre = await genre.save();
    res.send(genre);

});

router.put('/:id',async(req,res)=>{
    const genre = await Genre.findByUpdate(req.params.id,{name : req.body.name},{
        new: true
    });

    if (!genre) return res.status(404).send('The Genre with the given ID does not exist');

    res.send(genre);
});

router.delete('/:id',[auth,admin],async(req,res)=>{
    const genre = await Genre.findByAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID does not exist');
    res.send(genre);
});

router.get('/:id',async(req,res)=>{
    const genre = await findById(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID does not exist');
    res.send(genre);
});

module.exports= router;

