import express from 'express';
import dotenv from 'dotenv';
import { processListings } from './src/controllers/listening.controller';
import sequelize from './src/db/mysql_db';
import fetchEvent from './src/handlers/api.handler';
dotenv.config();

const port = process.env.HTTP_PORT || 3001;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API IS WORKING')
})

async function start() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully');

        setInterval(fetchEvent, 60000);

        setInterval(processListings, 6000);
        app.listen(port, () => {
            console.log(`Server is listening to port: ${port}...`);
        })
    } catch(error) {
        console.log(`Server error: ${error}`)
    }
}

start();