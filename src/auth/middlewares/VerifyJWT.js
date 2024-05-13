import jwt from "jsonwebtoken";
import "dotenv/config";

export default function verifyJWT(req, res, next) {
    try {
        if (!req.body.token) {
            return res.status(400).send({ "error": { "message": "Token is required." } });
        }

        const token = req.body.token;

        const decoded = jwt.decode(token, { complete: true });
        const payloadEmail = decoded.payload.email;

        if (req.body.email !== payloadEmail) {
            return res.status(401).send({ "error": { "message": "Unauthorized access." } });
        }

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