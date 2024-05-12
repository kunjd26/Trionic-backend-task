import mysql from "mysql2";
import connection from "./../../db.config.js";
import "dotenv/config";

class UserController {

    show(req, res) {
        try {
            const { email } = req.body;

            let sql = "SELECT events.id AS id, title, description, date, available_seats FROM events WHERE is_deleted = 0 AND available_seats > 0 AND date >= CURDATE()";
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

    book(req, res) {
        try {
            const { id, email, seats } = req.body;

            let sql = "SELECT count(*) AS row_count FROM events WHERE id = ? AND is_deleted = 0 AND available_seats >= ?";
            let values = [id, seats];

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error, rows) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else if (rows[0].row_count == 0) {
                    res.status(422).send({ "error": { "message": "Available seats are less." } });
                } else {
                    sql = "INSERT INTO user_event (event_id, number_of_seats, user_id) VALUES (?, ?, (SELECT id FROM users WHERE email = ?))";
                    values = [id, seats, email];

                    conn.execute(sql, values, (error) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send({ "error": { "message": "Internal server error." } });
                        } else {
                            sql = "UPDATE events SET available_seats = available_seats - ? WHERE id = ?";
                            values = [seats, id];
                            conn.execute(sql, values, (error) => {
                                if (error) {
                                    console.log(error);
                                    res.status(500).send({ "error": { "message": "Internal server error." } });
                                } else {
                                    res.status(200).send({ "data": { "message": "Booking successful." } });
                                }
                                conn.end();
                            });
                        }
                    });
                }
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }

    history(req, res) {
        try {
            const { email } = req.body;

            let sql = "SELECT events.id AS id, title, description, date, number_of_seats FROM events JOIN user_event ON events.id = user_event.event_id JOIN users ON user_event.user_id = users.id WHERE users.email = ?";
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
}

export default new UserController();
