const bcrypt = require("bcrypt");
const db = require("../db");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");

class User {
    static makeUser(user) {
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            createdAt: user.created_at,
        };
    }

    static async login(credentials) {
        const requiredFields = ["email", "password"];

        requiredFields.forEach((field) => {
            if (!credentials[field]) {
                throw new BadRequestError(`missing ${field} in request.body`);
            }
        });

        const user = await User.fetchUserByEmail(credentials.email);
        if (user) {
            const isValid = await bcrypt.compare(
                credentials.password,
                user.password
            );
            if (isValid) {
                return User.makeUser(user);
            }
        }

        throw new UnauthorizedError("Bad password/email");
    }

    static async register(credentials) {
        const requiredFields = [
            "email",
            "username",
            "password",
            "first_name",
            "last_name",
        ];

        requiredFields.forEach((field) => {
            if (!credentials[field]) {
                throw new BadRequestError(`${field} is not in request.body`);
            }
        });

        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.");
        }

        const existingUser = await User.fetchUserByEmail(credentials.email);
        if (existingUser)
            throw new BadRequestError(
                `User already exists with email: ${credentials.email}`
            );

        const hashedPassword = await bcrypt.hash(
            credentials.password,
            BCRYPT_WORK_FACTOR
        );

        const lol = await db.query(
            `SELECT *
            FROM information_schema.columns WHERE TABLE_NAME = $1
        ;
     `,
            ["users"]
        );
        // console.log(lol.rows.);
        lol.rows.forEach((row) => console.log(row.column_name));
        console.log(credentials.username, "<<<<<<<<<< the username is ");
        try {
            const query = `INSERT INTO users (email, password, username, first_name, last_name)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, email, first_name, last_name, username;
            `;
            const insertToDb = await db.query(query, [
                credentials.email.toLowerCase(),
                hashedPassword,
                credentials.username,
                credentials.first_name,
                credentials.last_name,
            ]);

            const res = insertToDb.rows[0];
            console.log(res);

            return User.makeUser(res);
        } catch (e) {
            console.log(e);
        }
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided");
        }

        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
            email.toLowerCase(),
        ]);

        return result.rows[0];
    }
}

module.exports = User;
