import mysql from "mysql2";
import connection from "./../../db.config.js";
import "dotenv/config";

class EventController {

    show(req, res) {
        try {
            const { email } = req.body;

            let sql = "SELECT title, description, date, total_seats, available_seats FROM events INNER JOIN users ON created_by = users.id WHERE email = ? AND role = 'admin'";
            let values = [email];

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error, rows) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else {
                    res.status(200).send({ "data": rows });
                }
                conn.end();
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }

    add(req, res) {
        try {
            const { email, title, description, date, seats } = req.body;

            let sql = "SELECT id FROM users WHERE email = ? AND role = 'admin'";
            let values = [email];
            let id = undefined;

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error, rows) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else {
                    id = rows[0].id;
                }

                sql = "INSERT INTO events (title, description, date, total_seats, available_seats, created_by) VALUES (?, ?, ?, ?, ?, ?)";
                values = [title, description, date, seats, seats, id]

                conn.execute(sql, values, (error) => {
                    if (error) {
                        console.log(error);
                        res.status(500).send({ "error": { "message": "Internal server error." } });
                    } else {
                        res.status(200).send({ "data": { "messages": "Event created successfully." } });
                    }
                });
                conn.end();
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }
}

export default new EventController();
