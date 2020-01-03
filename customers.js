 const{ Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
//const Joi = require('joi');  // validation 
const express = require ('express'); // to routes the paths
const router = express.Router();

// create the schema or structure in c++ or // Attributes
/* const customersSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength:50
    }
  }) ;*/  

   
  // Below all are toure haldlers // or toute

router.get('/', async  (req,res) =>{
     const customers = await Customer.find().sort('name');
     res.send(customers);

});

router.post('/', async (req, res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send (error.details[0].message);
    // create the customer object
    let customer = new  Customer ({
        name: req.body.name,
        isGold:req.body.isGold,
        phone:req.body.phone
    });  
    customer =  await customer.save(); // save in database
    res.send(customer);

});

// update the request 
router.put('/:id', async (req, res) =>{
     const {error} = validate(req.body);
     if(error) return res.status(400).send(error.details[0].message);
   
    const customer = await  Customer.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
        
     }, {new: true});

     if(!customer) return res.status(404).send(' No coustomrer with given ID.');
     // return the update to the customres
     res.send(customer);

});
  // delete the customers

router.delete('/:id', async(req,res)=>{
     const customer = await Customer.findByIdAndRemove(req.params.id);
     if(!customer) return res.status(404).send('No coustomrer with given ID.');
     res.send(customer);  // customer is deleted from the database

});

// get request by given id
router.get('/:id', async (req,res)=>{
   const customer = await  Customer.findById(req.params.id);
   if(!customer) return res.status(404).send('No coustomrer with given ID.');
   res.send(customer);
});

  module.exports = router;