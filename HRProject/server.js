// @ts-check

const { Client } = require("pg");
const express = require("express");
const app = express();
const port = 8080;
const User = require('./models/user.js');
const path = require('path');

const client = new Client({
    password: "root",
    user: "root",
    host: "postgres",
});

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/employees", async(req, res) => {
    const client = new Client({
        password: "root",
        user: "root",
        host: "postgres",
    });
    await client.connect();
    const results = await client
        .query("SELECT * FROM employees")
        .then((payload) => {
            return payload.rows;
        })
        .catch(() => {
            throw new Error("Query failed");
        })
    await client.end();

    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
});

/* app.get("/projects", async(req, res) => {
    const results = await client
        .query("SELECT * FROM projects")
        .then((payload) => {
            return payload.rows;
        })
        .catch(() => {
            throw new Error("Query failed");
        });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(results));
}); */

app.post('/signup', User.signup);
app.post('/login', User.signup);


app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});




(async() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
})();