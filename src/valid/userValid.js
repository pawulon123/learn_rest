const Joi = require('joi');

module.exports = 
     (data)=>{ 
    //  console.log(data);
     
    const schema = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required(),
        surename: Joi.string().alphanum().min(4).max(30).required(),  
        mail: Joi.string().min(4).max(30).required(),  
        birthday: Joi.string().min(4).max(30),
        password: Joi.string().min(4).max(30),
        });
    const result = schema.validate(data);
    if (result.error) {
         throw (result.error.message);
    }
}

     
