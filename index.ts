import express from "express";
import "express-async-errors";

import { dataBase } from './db';

require("dotenv").config();


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Hi");
});


dataBase.initialize().then(() => {
    app.listen(parseInt(process.env.PORT as string, 10), () => {
        console.log(`App listening on port:${process.env.PORT}`);
        console.log(`Swagger available on: ${process.env.BASE_URL}`);
    });
});