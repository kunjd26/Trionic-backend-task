import jwt from "jsonwebtoken";
import "dotenv/config";

export default function verifyJWT(req, res, next) {
    try {

        const token = req.body.token;

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {
            next();
        } else {
            res.status(401).send({ "error": { "message": "Invalid token." } });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": { "message": "Internal server error." } });
    }
}