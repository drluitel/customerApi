const mongoose = require('mongoose');
const Joi = require('joi');
// creating the customer object
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength:50
    },
    isGold: {
        type: String,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength:50
    }
  }));


  // validation function for the customers
function validateCuntomer(customer){
    const schema = {
        name: Joi.string().min(5).max(50).required(), 
        phone: Joi.string().min(5).max(50).required(), 
        isGold:Joi.boolean()
    };
    return Joi.validate(customer,schema);
}

exports.Customer =  Customer;
exports.validate = validateCuntomer;