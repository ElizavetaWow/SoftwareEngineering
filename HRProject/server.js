// @ts-check

const { Pool, Client } = require("pg");
const express = require("express");
const app = express();
const port = 9000;
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


app.get("/grades/all", Grade.showAll);
app.get("/projectrecords/all", ProjectRecord.showAll);
app.get("/rights/all", Rightt.showAll);
app.get("/skills/all", Skill.showAll);
app.get("/tasks/all", Task.showAll);
app.get("/vacancys/all", Vacancy.showAll);
app.get("/people/all", Person.showAll);
app.get("/personskill/:id", PersonSkill.findByPerson);


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

//employees
app.get("/employees/all", Employee.showAll);
app.post("/employee", Employee.findById);
app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/profile.html'));
});

app.get("/personemployee/emp", (req, res) => {
    const personid = req.query.id;
    PersonEmployee.findRecordByEmployee(personid).then((results) => {
        res.json(JSON.stringify(results))})
});

app.get("/projectrecord/person", (req, res) => {
    const personid = req.query.id;
    ProjectRecord.findProjectrecordByPerson(personid).then((results) => {
        res.json(JSON.stringify(results))})
});


//projects
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/projects.html'));
});
app.get('/projects/all', Project.showAll);

app.get("/project", (req, res) => {
    const projectid = req.query.id;
    Project.findProjectById(projectid).then((results) => {
        res.json(JSON.stringify(results))})
});

app.post('/projects/find',  (req, res) => {
    const project = req.body;
    if (project.name && project.start_date && project.end_date){
        project.start_date = new Date(project.start_date).toISOString()
        project.end_date = new Date(project.end_date).toISOString()
        Project.findProjectByNameStartEnd(project).then((results) => {
            res.json(JSON.stringify(results))})
    }
    else if (project.name && project.start_date && !project.end_date){
        project.start_date = new Date(project.start_date).toISOString()
        Project.findProjectByNameStart(project).then((results) => {
            res.json(JSON.stringify(results))})
    }
    else if (project.name && !project.start_date && project.end_date){
        project.end_date = new Date(project.end_date).toISOString()
        Project.findProjectByNameEnd(project).then((results) => {
            res.json(JSON.stringify(results))})
    }
    else if (!project.name && project.start_date && project.end_date){
        project.start_date = new Date(project.start_date).toISOString()
        project.end_date = new Date(project.end_date).toISOString()
        Project.findProjectByStartEnd(project).then((results) => {
            res.json(JSON.stringify(results))})
    }
    else if (project.name && !project.start_date && !project.end_date){
        Project.findProjectByName(project).then((results) => {
            res.json(JSON.stringify(results))})
    }
    else if (!project.name && project.start_date && !project.end_date){
        project.start_date = new Date(project.start_date).toISOString()
        Project.findProjectByStart(project).then((results) => {
            res.json(JSON.stringify(results))})
    }
    else if (!project.name && !project.start_date && project.end_date){
        project.end_date = new Date(project.end_date).toISOString()
        Project.findProjectByEnd(project).then((results) => {
            res.json(JSON.stringify(results))})
    }
    else {
        Project.findProjectByEnd(project).then((results) => {
            res.json(JSON.stringify(results))})
        res.redirect("/projects/all")
    }

});


app.get("/signin", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});
(async() => {
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
})();