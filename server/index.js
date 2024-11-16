const express = require('express');
const db = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// MIDDLEWARES
app.use(express.json()); //used parse incoming request send by client
app.use(cors());

port = process.env.PORT || 5000;

// ROOT PAGE
app.get("/", (req, res) => {
    res.json("Welcome Back!");
});

//used to import sub-routes
app.use("/api/contacts", require('./routes/contacts'));

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});