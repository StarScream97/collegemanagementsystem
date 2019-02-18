const Joi=require('joi');



const schema=Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    age:Joi.number().integer(),
    address:Joi.string().required(),
    phone:Joi.number().integer().required(),
    salary:Joi.number().integer(),
    teachingExperience:Joi.number().integer(),
    levelOfStudy:Joi.string().required()
});

const validator=function(teacher){
    return Joi.validate(teacher,schema);
}

module.exports=validator;