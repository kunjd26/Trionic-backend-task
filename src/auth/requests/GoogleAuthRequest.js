import Joi from "joi";

const schema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required."
    }),
    name: Joi.string().required().messages({
        "any.required": "Name is required."
    })
}).unknown(true);

export default function googleAuthRequest(req, res, next) {

    try {
        const { error } = schema.validate(req.body);

        if (error) {
            let errorMessage = error.details[0].message;
            res.status(422).send({ "error": { "message": errorMessage } });
        } else {
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": { "message": "Internal server error." } });
    }
}
