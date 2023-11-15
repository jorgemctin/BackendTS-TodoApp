import express from 'express';
import { dataBase } from './db';
import router from './router';

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(router);

dataBase.initialize()
    .then(() => {
        const PORT = parseInt(process.env.PORT as string, 10) || 3000;
        app.listen(PORT, () => {
            console.log(`App listening on port:${PORT}`);
            console.log(`Swagger available on: ${process.env.BASE_URL}`);
        });
    })
    .catch(error => {
        console.error('Failed to initialize database:', error);
    });