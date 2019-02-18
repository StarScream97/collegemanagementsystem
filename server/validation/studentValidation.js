const Joi=require('joi');



const schema=Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6),    
    age:Joi.number().integer(),
    address:Joi.string().required(),
    phone:Joi.number().integer().required(),
    semester:Joi.number().integer().required(),
    profileImage:Joi.string()
});

const validator=function(student){
    return Joi.validate(student,schema);
}

module.exports=validator;