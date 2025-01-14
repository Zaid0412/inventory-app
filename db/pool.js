const { Pool } = require('pg')
require('dotenv').config()

const connectionString = "postgresql://postgres:jJAcToDFqQOIMyjAkTbFRQzyGyTTXIyW@junction.proxy.rlwy.net:37388/railway"

// module.exports = new Pool({
//     host:process.env.HOST,
//     user:process.env.USER,
//     database:process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.DATABASE_PORT
// })

module.exports = new Pool({
    connectionString,
});