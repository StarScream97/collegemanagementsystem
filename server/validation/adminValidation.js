const Joi=require('joi');



const schema=Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6),
    age:Joi.number().integer(),
    address:Joi.string().required(),
    phone:Joi.number().integer().required()
});

const validator=function(admin){
    return Joi.validate(admin,schema);
}

module.exports=validator;