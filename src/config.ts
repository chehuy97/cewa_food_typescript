require('dotenv').config()

export const EnvironmentVariable = {
    PORT: process.env.PORT,
    DATABASE_CONNECTION: process.env.database_connection
}