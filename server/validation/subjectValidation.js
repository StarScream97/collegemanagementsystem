const Joi=require('joi');


const schema=Joi.object().keys({
    title:Joi.string().required(),
    description:Joi.string().required(),
    semester:Joi.number().integer(),
    fullMarks:Joi.number().integer(),
    passMarks:Joi.number().integer(),
    teacherId:Joi.string().required()

});

const validator=function(subject){
    return Joi.validate(subject,schema);
}

module.exports=validator;