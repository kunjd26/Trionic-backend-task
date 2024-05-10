import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Name is required."
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required."
    }),
    password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})'))
        .messages({
            'string.min': 'Password must be at least 6 characters long.',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'any.required': 'Password is required.'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Confirm password does not match with password',
            'any.required': 'Confirm password is required.'
        })
});

export default function validateSignupRequest(req, res, next) {

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
