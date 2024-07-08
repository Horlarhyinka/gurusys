import Joi from "joi"

class Validator{
    validateRegisterPayload(obj: object){
        return Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required().min(6)
        }).validate(obj)
    }

    validateCreateBlogPayload(obj: object){
        return Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            tags: Joi.any()
        }).validate(obj)
    }
    validatUpdateBlogPayload(obj: object){
        return Joi.object({
            title: Joi.string(),
            content: Joi.string(),
            tags: Joi.any()
        }).validate(obj)
    }

    validateCreateCommentPayload(obj: object){
        return Joi.object({
            body: Joi.string().required()
        }).validate(obj)
    }
}


const validator = new Validator()
export default Object.freeze(validator)