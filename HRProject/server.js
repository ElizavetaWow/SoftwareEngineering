// @ts-check

const { Pool, Client } = require("pg");
const express = require("express");
const app = express();
const port = 8080;
const Employee = require('./models/employee.js');
const Project = require('./models/project.js');
const Grade = require('./models/grade.js');
const ProjectRecord = require('./models/projectrecord.js');
const Rightt = require('./models/rightt.js');
const Skill = require('./models/skill.js');
const Task = require('./models/task.js');
const Vacancy = require('./models/vacancy.js');
const Person = require('./models/person.js');
const PersonRight = require('./models/personright.js');
const PersonEmployee = require('./models/personemployee.js');
const PersonSkill = require('./models/personskill.js');
const RequiredSkill = require('./models/requiredskill.js');
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

app.get("/employees", Employee.showAll);
app.get("/projects", Project.showAll);
app.get("/grades", Grade.showAll);
app.get("/projectrecords", ProjectRecord.showAll);
app.get("/rights", Rightt.showAll);
app.get("/skills", Skill.showAll);
app.get("/tasks", Task.showAll);
app.get("/vacancys", Vacancy.showAll);
app.get("/people", Person.showAll);

app.get("/employees/:id", Employee.findById);


app.post('/employees/create', Employee.create);
app.post("/projects/create", Project.create);
app.post("/grades/create", Grade.create);
app.post("/projectrecords/create", ProjectRecord.create);
app.post("/rights/create", Rightt.create);
app.post("/skills/create", Skill.create);
app.post("/tasks/create", Task.create);
app.post("/vacancys/create", Vacancy.create);
app.post("/people/create", Person.create);
app.post("/personright/create", PersonRight.addPersonRight);
app.post("/personemployee/create", PersonEmployee.addPersonEmployee);
app.post("/personskill/create", PersonSkill.addPersonSkill);
app.post("/requiredskill/create", RequiredSkill.addRequiredSkill);

app.post('/signup', Employee.create);
app.post('/signin', Employee.signin);

app.post('/employees/update', Employee.updateGrade);
app.post('/employees/find/bygrade', Employee.findByGrade);

app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});




(async() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
})();