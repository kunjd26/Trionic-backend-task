import Joi from "joi";

const schema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required."
    }),
    id: Joi.number().required().messages({
        "number.base": "Event ID must be a number.",
        "any.required": "Event ID is required."
    }),
    seats: Joi.number().required().messages({
        "number.base": "Seats must be a number.",
        "any.required": "Seats is required."
    })
});

export default function bookEventsRequest(req, res, next) {

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
