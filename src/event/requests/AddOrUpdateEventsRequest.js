import Joi from "joi";

const schema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email address.",
        "any.required": "Email is required."
    }),
    title: Joi.string().required().messages({
        "any.required": "Title is required."
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is required."
    }),
    date: Joi.date().required().messages({
        "any.required": "Date is required."
    }),
    seats: Joi.number().required().min(1).max(100).messages({
        "any.required": "Seat is required.",
        "number.min": "Seat must be at least 1.",
        "number.max": "Seat must be at most 100."
    }),
}).unknown(true);

export default function addOrUpdateEventsRequest(req, res, next) {

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
