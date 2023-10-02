const {Customer}= require('../models/customer');
const express  = require('express');
const router  = express.Router();

router.get('/',async(req,res)=>{
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.post('/',async(req,res)=>{
    let customer=new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    
    res.send(customer);
});

router.put('/:id',async(req,res)=>{
    const customer = await Customer.findByUpdate(req.params.id,{name : req.body.name},{
        new: true
    });

    if (!customer) return res.status(404).send('The Customer with the given ID does not exist');

    res.send(customer);
});

router.delete('/:id',async(req,res)=>{
    const customer = await Customer.findByAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID does not exist');
    res.send(customer);
});

router.get('/:id',async(req,res)=>{
    const customer = await findById(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID does not exist');
    res.send(customer);
});


module.exports  = router;