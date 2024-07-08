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
            tags: Joi.array()
        }).validate(obj)
    }
    validateCreateComentPayload(obj: object){
        return Joi.object({
            // postId
        })
    }
}


const validator = new Validator()
export default Object.freeze(validator)