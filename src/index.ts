import express from 'express';
import { dataBase } from './db';
import router from './router';
const cors = require('cors');

const app = express();

app.use(cors());
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