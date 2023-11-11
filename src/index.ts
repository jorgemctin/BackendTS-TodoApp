import express from "express";
// import "express-async-errors";

import { dataBase } from './db';

require("dotenv").config();


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Hi");
});


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
        // Handle the error appropriately
    });