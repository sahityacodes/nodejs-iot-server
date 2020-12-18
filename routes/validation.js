const Joi = require('joi'); //Validation

//Validation
const registerValidation = (data) =>{
const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    contactNo: Joi.string().length(10)
};
 return Joi.validate(data,schema);
};


const loginValidation = (data) =>{
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
     return Joi.validate(data,schema);
    };

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;