const { Pool } = require("pg");
const Grade = require('./models/grade.js');
const Project = require('./models/project.js');
const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const create = (req, res) => {
    const vacancy = req.body
    createVacancy(vacancy).then((status) => {
        if (status == 'true') {
            res.status(201).json({ "status": true, "result": 'Operation successful!' })
        } else if (status == 'already exists') {
            res.status(200).json({ "status": false, "result": "Already exists!" })
        } else {
            res.status(200).json({ "status": false, "result": "Request Failed!" })
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    })

}

const delet = (req, res) => {
    const vacancy = req.body
    deleteVacancy(vacancy).then((status) => {
        if (status == 'true') {
            res.status(201).json({ "status": true, "result": 'Operation successful!' })
        } else if (status == "doesn't exist ") {
            res.status(200).json({ "status": false, "result": "Doesn't exist!" })
        } else {
            res.status(200).json({ "status": false, "result": "Request Failed!" })
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    })
}

const deleteAll = async(req, res) => {
    try {
        var sql = `DELETE FROM vacancy`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const createVacancy = async(vacancy) => {
    try {
        const results = findVacancyByDescriptionGradeProject(vacancy).then(async foundVacancy => {
            if (foundVacancy == undefined) {
                var sql = `
            INSERT INTO vacancy(description, project_projectid, grade_gradeid) VALUES('${vacancy.description}', ${vacancy.projectid}, ${vacancy.gradeid})
            `;
                await pool.query(sql);
                return 'true';
            }
            return 'already exists';
        })
        return results;
    } catch (error) {
        console.error(error.stack);
        return 'false';
    }

}

const deleteVacancy = async(vacancy) => {
    try {
        const results = findVacancyByDescriptionGradeProject(vacancy).then(async foundVacancy => {
            if (foundVacancy !== undefined) {
                var sql = `
            DELETE FROM vacancy WHERE vacancyid = ${ foundVacancy.vacancyid }
            `;
                await pool.query(sql);
                return 'true';
            }
            return "doesn't exist";
        })
        return results;
    } catch (error) {
        console.error(error.stack);
        return 'false';
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM vacancy")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}




const findById = async(req, res) => {
    const vacancy = req.body
    findVacancyById(vacancy.id).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findVacancyById = async(vacancyId) => {
    var sql = `SELECT * FROM vacancy WHERE vacancyid = ${ vacancyId }`;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findByDescription = (req, res) => {
    const vacancy = req.body
    findVacancyByDescription(vacancy).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findVacancyByDescription = async(vacancy) => {
    var sql = `
            SELECT * FROM vacancy WHERE description = '${vacancy.description}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByDescriptionProject = (req, res) => {
    const vacancy = req.body
    findVacancyByDescriptionProject(vacancy).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findVacancyByDescriptionProject = async(vacancy) => {
    var sql = `
            SELECT * FROM vacancy WHERE (description = '${vacancy.description}' AND project_projectid = ${vacancy.projectid})
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByDescriptionGrade = (req, res) => {
    const vacancy = req.body
    findVacancyByDescriptionGrade(vacancy).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findVacancyByDescriptionGrade = async(vacancy) => {
    var sql = `
            SELECT * FROM vacancy WHERE (description = '${vacancy.description}' AND grade_gradeid = ${vacancy.gradeid})
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByDescriptionGradeProject = (req, res) => {
    const vacancy = req.body
    findVacancyByDescriptionGradeProject(vacancy).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findVacancyByDescriptionGradeProject = async(vacancy) => {
    var sql = `
            SELECT * FROM vacancy WHERE (description = '${vacancy.description}' AND grade_gradeid = ${vacancy.gradeid} AND project_projectid = ${vacancy.projectid})
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}



const updateDescription = (req, res) => {
    const vacancy = req.body
    updateVacancyDescription(vacancy).then((status) => {
        if (status == 'true') {
            res.status(200).json({ "status": true, "result": 'Operation successful!' })
        } else if (status == "doesn't exist") {
            res.status(200).json({ "status": false, "result": "Doesn't exist!" })
        } else {
            res.status(200).json({ "status": false, "result": "Request Failed!" })
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    })
}

const updateVacancyDescription = async(vacancy) => {
    try {
        const results = findByDescriptionProject(vacancy).then(async foundVacancy => {
            if (foundVacancy !== undefined) {
                var sql = `
            UPDATE vacancy SET description = '${vacancy.newdescription}'
            WHERE vacancyid = ${ foundVacancy.vacancyid }
            `;
                await pool.query(sql);
                return 'true';
            }
            return "doesn't exist";
        })
        return results;
    } catch (error) {
        console.error(error.stack);
        return 'false';
    }
}


const updateGrade = (req, res) => {
    const data = req.body
    updateVacancyGrade(data).then((status) => {
        if (status == 'true') {
            res.status(200).json({ "status": true, "result": 'Operation successful!' })
        } else if (status == "doesn't exist") {
            res.status(200).json({ "status": false, "result": "Doesn't exist!" })
        } else {
            res.status(200).json({ "status": false, "result": "Request Failed!" })
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    })
}

const updateVacancyGrade = async(data) => {
    try {
        foundGrade = Grade.findGradeByName(data.grade_name)
        const results = findVacancyById(data.vacancy_id).then(async foundVacancy => {
            if (foundVacancy !== undefined) {
                var sql = `
                UPDATE vacancy SET grade_gradeid = ${foundGrade.gradeid }
                WHERE vacancyid = ${ foundVacancy.vacancyid }
                `;
                await pool.query(sql);
                return 'true';
            }
            return "doesn't exist";
        })
        return results;
    } catch (error) {
        console.error(error.stack);
        return 'false';
    }
}

const updateProject = (req, res) => {
    const data = req.body
    updateVacancyProject(data).then((status) => {
        if (status == 'true') {
            res.status(200).json({ "status": true, "result": 'Operation successful!' })
        } else if (status == "doesn't exist") {
            res.status(200).json({ "status": false, "result": "Doesn't exist!" })
        } else {
            res.status(200).json({ "status": false, "result": "Request Failed!" })
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    })
}

const updateVacancyProject = async(data) => {
    try {
        foundProject = Project.findProjectById(data.projectid)
        const results = findVacancyById(data.vacancy_id).then(async foundVacancy => {
            if (foundVacancy !== undefined) {
                var sql = `
                UPDATE vacancy SET project_projectid = ${foundProject.projectid }
                WHERE vacancyid = ${ foundVacancy.vacancyid }
                `;
                await pool.query(sql);
                return 'true';
            }
            return "doesn't exist";
        })
        return results;
    } catch (error) {
        console.error(error.stack);
        return 'false';
    }
}

module.exports = {
    create,
    createVacancy,
    delet,
    deleteVacancy,
    deleteAll,
    findByDescriptionGradeProject,
    findByDescription,
    findByDescriptionGrade,
    updateDescription,
    updateGrade,
    updateProject,
    showAll,
    findById
}