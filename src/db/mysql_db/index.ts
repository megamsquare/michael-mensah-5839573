import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db_name = process.env.DB_NAME || 'testdb';
const db_username = process.env.DB_USERNAME || 'root';
const db_password = process.env.DB_PASSWORD || 'michael';
const db_host = process.env.DB_HOST || 'localhost';

console.log(`db_name: ${db_name}, db_username: ${db_username}, db_password: ${db_password}, db_host: ${db_host}`)

const sequelize = new Sequelize(db_name, db_username, db_password, {
    host: db_host,
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export default sequelize;