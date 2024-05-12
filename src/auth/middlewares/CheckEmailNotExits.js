import mysql from "mysql2";
import connection from "./../../../db.config.js";

export default function checkEmailNotExists(req, res, next) {
    try {
        const { email } = req.body;

        // First, check if the email already exists
        let sql = "SELECT count(*) AS row_count FROM users WHERE email = ?";
        let values = [email];

        const conn = mysql.createConnection(connection);

        conn.execute(sql, values, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ "error": { "message": "Internal server error." } });
            } else if (results[0].row_count > 0) {
                next();
            } else {
                res.status(404).send({ "error": { "message": "Email id not found." } });
            }
            conn.end();
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": { "message": "Internal server error." } });
    }
}
