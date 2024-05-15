import mysql from "mysql2";
import connection from "./../../../db.config.js";

export default function checkRateLimit(req, res, next) {
    try {
        const { email } = req.body;

        // If rate limit is 0 than send an error message.
        let sql = "SELECT count(*) AS row_count FROM users WHERE email = ? AND rate_limit > 0";
        let values = [email];

        const conn = mysql.createConnection(connection);

        conn.execute(sql, values, (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).send({ "error": { "message": "Internal server error." } });
            } else if (results[0].row_count == 0) {
                res.status(422).send({ "error": { "message": "You have reached maximum wrong password limit." } });
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
