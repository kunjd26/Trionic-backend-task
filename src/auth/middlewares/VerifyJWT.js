import jwt from "jsonwebtoken";
import "dotenv/config";

export default function verifyJWT(req, res, next) {
    try {

        const token = req.header("Authorization").split(" ")[1];

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (verified) {

            // Put token in response header
            res.header("Authorization", `Bearer ${token}`);

            // Decode the token to get the payload
            const payload = jwt.decode(token);

            req.body.id = payload.id

            next();
        } else {
            res.status(401).send({ "error": { "message": "Invalid token." } });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": { "message": "Internal server error." } });
    }
}