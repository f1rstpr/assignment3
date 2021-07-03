const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Activity {
    static async getTotalSum({ user }) {
        const results = await db.query(
            `SELECT SUM (duration) FROM exercises WHERE user_id = (SELECT id FROM users WHERE email = $1)`,
            [user.email]
        );

        return results.rows[0];
    }

    static async getAvgCalories({ user }) {
        const results = await db.query(
            `SELECT AVG (calories) FROM nutrition WHERE user_id = (SELECT id FROM users WHERE email = $1)`,
            [user.email]
        );

        return results.rows[0];
    }

    static async getAvgIntensity({ user }) {
        const results = await db.query(
            `SELECT AVG (intensity) FROM exercises WHERE user_id = (SELECT id FROM users WHERE email = $1)`,
            [user.email]
        );
        return results.rows[0];
    }

    static async fetchActivityById(type, activityId) {
        let results = null;
        if (type === "exercises") {
            results = await db.query(`SELECT * FROM exercises WHERE id = $1`, [
                activityId,
            ]);
        } else if (type === "nutrition") {
            results = await db.query(`SELECT * FROM nutrition WHERE id = $1`, [
                activityId,
            ]);
        } else {
            throw new BadRequestError(`${type} is not part of activities`);
        }

        return results.rows;
    }

    static async listUserActivities(type, { user }) {
        let results = undefined;
        if (type === "exercises") {
            results = await db.query(
                `
                SELECT * FROM exercises
                WHERE user_id = (SELECT id FROM users WHERE email = $1)
                ORDER BY exercises.created_at DESC
            `,
                [user.email]
            );
        } else if (type === "nutrition") {
            results = await db.query(
                `
                SELECT * FROM nutrition
                WHERE user_id = (SELECT id FROM users WHERE email = $1)
                ORDER BY nutrition.created_at DESC
            `,
                [user.email]
            );
        } else {
            throw new BadRequestError(`${type} is not part of activities`);
        }
        return results.rows;
    }

    static async createNewActivity({ user, details, type }) {
        let requiredFields = null;
        console.log(type);

        if (type === "exercises") {
            requiredFields = [
                "name",
                "image_url",
                "category",
                "duration",
                "intensity",
            ];
        } else if (type === "nutrition") {
            requiredFields = [
                "name",
                "image_url",
                "category",
                "quantity",
                "calories",
            ];
        } else {
            throw new BadRequestError(
                "Activiy can only be exercises, nutrition"
            );
        }

        requiredFields.forEach((field) => {
            if (!details[field]) {
                throw new BadRequestError(
                    `${field} not in request.body.activity`
                );
            }
        });

        let results = undefined;

        if (type === "exercises") {
            results = await db.query(
                `
            INSERT INTO exercises (user_id, name, image_url, category, duration, intensity)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, user_id, name, image_url, category, duration, intensity
        `,
                [
                    user.id,
                    details.name,
                    details.image_url,
                    details.category,
                    details.duration,
                    details.intensity,
                ]
            );
        } else if (type === "nutrition") {
            results = await db.query(
                `
            INSERT INTO nutrition (user_id, name, image_url, category, quantity, calories)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, user_id, name, image_url, category, quantity, calories
        `,
                [
                    user.id,
                    details.name,
                    details.image_url,
                    details.category,
                    details.quantity,
                    details.calories,
                ]
            );
        }

        const newlyInserted = results.rows;
        if (!newlyInserted) {
            throw new BadRequestError("Cannot insert into database");
        }

        return { newlyInserted, user, type };
    }
}

module.exports = Activity;
