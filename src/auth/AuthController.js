import mysql from "mysql2";
import connection from "./../../db.config.js";
import crypto from "crypto";
import "dotenv/config";
import generateJWT from "./services/GenerateJWT.js";

class AuthController {
    signup(req, res) {
        try {
            const { name, email, password } = req.body;

            // hash the password here.
            let hashPassword = crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, 1000, 64, `sha512`).toString('hex');

            let sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            let values = [name, email, hashPassword];

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else {
                    res.status(200).send({ "data": { "message": "User sign-up successfully." } });
                }
                conn.end();
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }

    signin(req, res) {
        try {
            const { email, password } = req.body;

            // hash the password here.
            let hashPassword = crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, 1000, 64, `sha512`).toString('hex');

            let sql = "SELECT COUNT(*) AS row_count, email, id FROM users WHERE email = ? AND password = ?";
            let values = [email, hashPassword];

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error, rows) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else if (rows[0].row_count == 0) {

                    sql = "UPDATE users SET rate_limit = rate_limit - 1 WHERE email = ? AND rate_limit > 0";
                    values = [email];

                    conn.execute(sql, values, (error) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send({ "error": { "message": "Internal server error." } });
                        }
                    });
                    res.status(401).send({ "error": { "message": "Password incorrect." } });
                } else {
                    sql = "UPDATE users SET rate_limit = 5 WHERE email = ?";
                    values = [email];

                    conn.execute(sql, values, (error) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send({ "error": { "message": "Internal server error." } });
                        }
                    });

                    let jwt = generateJWT(rows[0]);
                    res.setHeader("Authorization", `Bearer ${jwt}`);
                    res.status(200).send({ "data": { "message": "User sign-in successfully." } });
                }
                conn.end();
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }

    googleAuth(req, res) {
        try {
            const { email, name } = req.body;

            let sql = "SELECT count(*) AS row_count, email, id FROM users WHERE email = ?";
            let values = [email];

            const conn = mysql.createConnection(connection);

            conn.execute(sql, values, (error, rows) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ "error": { "message": "Internal server error." } });
                } else if (rows[0].row_count == 0) {
                    sql = "INSERT INTO users (name, email, third_party) VALUES (?, ?, ?)";
                    values = [name, email, 1];

                    conn.execute(sql, values, (error) => {
                        if (error) {
                            console.log(error);
                            res.status(500).send({ "error": { "message": "Internal server error." } });
                        }
                    });

                    let jwt = generateJWT(rows[0]);
                    res.setHeader("Authorization", `Bearer ${jwt}`);
                    res.status(200).send({ "data": { "message": "User sign-in with google successfully." } });
                }
                conn.end();
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ "error": { "message": "Internal server error." } });
        }
    }
}

export default new AuthController();