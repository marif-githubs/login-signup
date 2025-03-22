require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized : false,
    }
})

pool.connect().
    then(() => console.log("database connected🟩"))
    .catch((err) => console.log("database connection err🟥", err))

module.exports = pool;