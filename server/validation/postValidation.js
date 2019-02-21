const Joi=require('joi');



const schema=Joi.object().keys({
    title:Joi.string().required(),
    body:Joi.string().required(),
    authorId:Joi.string().required(),
    onModel:Joi.string().required(),
    postWithImage:Joi.boolean().required()
});

const validator=function(post){
    return Joi.validate(post,schema);
}

module.exports=validator;