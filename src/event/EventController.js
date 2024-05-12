import mysql from "mysql2";
import connection from "./../../db.config.js";
import "dotenv/config";

class EventController {

    show(req, res) {
        try {
            const { email } = req.body;

            let sql = "SELECT events.id AS id, title, description, date, total_seats, available_seats FROM events INNER JOIN users ON created_by = users.id WHERE email = ? AND role = 'admin' AND is_deleted = 0";
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

    showOne(req, res) {
        try {
            const { email } = req.body;
            const { id } = req.params;

            let sql = "SELECT count(*) AS row_count, events.id AS id, title, description, date, total_seats, available_seats FROM events INNER JOIN users ON created_by = users.id WHERE email = ? AND role = 'admin' AND events.id = ? AND is_deleted = 0";
            let values = [email, id];

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error, rows) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else if (rows[0].row_count == 0) {
                    res.status(404).send({ "error": { "message": "Event not found." } });
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
                        res.status(200).send({ "data": { "message": "Event created successfully." } });
                    }
                });
                conn.end();
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }

    update(req, res) {
        try {
            const { email, title, description, date, seats } = req.body;
            const { id } = req.params;

            let sql = "SELECT total_seats, available_seats, sum(number_of_seats) AS booked_seats FROM events INNER JOIN user_event ON events.id = user_event.event_id WHERE events.id = ? AND created_by = (SELECT id FROM users WHERE email = ?)"
            let values = [id, email];

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error, rows) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else {
                    let total_seats, available_seats;
                    if (rows[0].booked_seats == 0) {
                        total_seats = seats;
                        available_seats = seats;
                    } else if (seats >= parseInt(rows[0].booked_seats, 10)) {
                        total_seats = seats;
                        available_seats = seats - rows[0].booked_seats;

                        sql = "UPDATE events SET title = ?, description = ?, date = ?, total_seats = ?, available_seats = ? WHERE id = ? AND created_by = (SELECT id FROM users WHERE email = ? AND role = 'admin')";
                        values = [title, description, date, total_seats, available_seats, id, email];

                        conn.execute(sql, values, (error) => {
                            if (error) {
                                console.log(error);
                                res.status(500).send({ "error": { "message": "Internal server error." } });
                            } else {
                                res.status(200).send({ "data": { "message": "Event updated successfully." } });
                            }
                            conn.end();
                        });
                    } else {
                        res.status(422).send({ "error": { "message": "Total seats less than already booked seats." } });
                    }
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }

    delete(req, res) {
        try {
            const { email } = req.body;
            const { id } = req.params;

            let sql = "UPDATE events SET is_deleted = 1 WHERE id = ? AND created_by = (SELECT id FROM users WHERE email = ? AND role = 'admin')";
            let values = [id, email];

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error, rows) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else if (rows.affectedRows == 0) {
                    res.status(404).send({ "error": { "message": "Event not found." } });
                } else {
                    res.status(200).send({ "data": { "message": "Event deleted successfully." } });
                }
                conn.end();
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }
}

export default new EventController();
