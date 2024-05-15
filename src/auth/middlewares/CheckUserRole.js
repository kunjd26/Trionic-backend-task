import mysql from "mysql2";
import connection from "../../../db.config.js";

export default function checkUserRole(req, res, next) {
    try {
        const { email } = req.body;

        // Check role in request body and compare it with the role in the database.
        let sql = "SELECT role FROM users WHERE email = ?";
        let values = [email];

        const conn = mysql.createConnection(connection);

        conn.execute(sql, values, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ "error": { "message": "Internal server error." } });
            } else if (results[0].role != req.body.role) {
                res.status(401).send({ "error": { "message": "Unauthorized access." } });
            } else {
                next();
            }
            conn.end();
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": { "message": "Internal server error." } });
    }
}
