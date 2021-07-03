require("dotenv").config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SECRET_KEY = process.env.SECRET_KEY || "lol";
const BCRYPT_WORK_FACTOR = 10;

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres";
    const dbPass = process.env.DATABASE_PASS
        ? encodeURI(process.env.DATABASE_PASS)
        : "postgres";
    const dbHost = process.env.DATABASE_HOST || "localhost";
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbName = process.env.DATABASE_NAME || "lifetracker";

    return (
        process.env.DATABASE_URL ||
        `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
    );
}

module.exports = {
    PORT,
    SECRET_KEY,
    getDatabaseUri,
    BCRYPT_WORK_FACTOR,
};
