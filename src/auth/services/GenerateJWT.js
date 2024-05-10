import jwt from "jsonwebtoken";
import "dotenv/config";

export default function generateJWT(user) {

    try {
        const payload = {
            id: user.id,
            email: user.email,
            date: new Date(),
        };
        return jwt.sign(payload, process.env.JWT_SECRET);
    } catch (error) {
        console.log(error);
    }
}