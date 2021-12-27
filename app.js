const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./Router/index");
const cors = require("cors");

dotenv.config()

app.use(cors());
app.use(express.json());
app.use('/', router);

mongoose.connect(process.env.MONGO_URL)
    .then(res => {
        app.listen(process.env.PORT, () => {
            console.log(`server is running`)
        })
    })
    .catch(err => err)

