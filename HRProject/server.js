// @ts-check

const { Pool, Client } = require("pg");
const express = require("express");
const app = express();
const port = 8080;
const User = require('./models/user.js');
const path = require('path');
const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/employees", async (req, res) => {
    const results = await pool.query("SELECT * FROM employee")
        .then((payload) => {
            return payload.rows;
        })
        .catch(() => {
            throw new Error("Query failed");
        });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
});

app.get("/projects", async (req, res) => {
    const results = await pool.query("SELECT * FROM project")
        .then((payload) => {
            return payload.rows;
        })
        .catch(() => {
            throw new Error("Query failed");
        });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
});



app.post('/signup', User.signup);
app.post('/signin', User.signin);


app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});




(async () => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
})();