const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);


const create = (req, res) => {
    const project = req.body
    createProject(project).then((status) => {
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
    const project = req.body
    deleteProject(project).then((status) => {
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
        var sql = `DELETE FROM project`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM project")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}

const findByName = (req, res) => {
    const project = req.body
    findProjectByName(project).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByStart = (req, res) => {
    const project = req.body
    findProjectByStart(project).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByEnd = (req, res) => {
    const project = req.body
    findProjectByEnd(project).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNameStartEnd = (req, res) => {
    const project = req.body
    findProjectByNameStartEnd(project).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNameStart = (req, res) => {
    const project = req.body
    findProjectByNameStart(project).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNameEnd = (req, res) => {
    const project = req.body
    findProjectByNameEnd(project).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByStartEnd = (req, res) => {
    const project = req.body
    findProjectByStartEnd(project).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const updateName = (req, res) => {
    const project = req.body
    updateProjectName(project).then((status) => {
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

const updateStart = (req, res) => {
    const project = req.body
    updateProjectStart(project).then((status) => {
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

const updateEnd = (req, res) => {
    const project = req.body
    updateProjectEnd(project).then((status) => {
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

const createProject = async(project) => {
    try {
        const results = findProjectByNameStartEnd(project).then(async foundProject => {
            if (foundProject == undefined) {
                var sql = `
            INSERT INTO project(name, start_date, end_date) VALUES('${project.name}', '${project.start_date}', '${project.end_date}')
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

const deleteProject = async(project) => {
    try {
        const results = findProjectByNameStartEnd(project).then(async foundProject => {
            if (foundProject !== undefined) {
                var sql = `
            DELETE FROM project WHERE projectid = $ { foundProject.projectid }
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

const findProjectByName = async(project) => {
    var sql = `
            SELECT * FROM project WHERE name = '${project.name}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectByStart = async(project) => {
    var sql = `
            SELECT * FROM project WHERE start_date = $ { project.start_date }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectByEnd = async(project) => {
    var sql = `
            SELECT * FROM project WHERE end_date = $ { project.end_date }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectByNameStartEnd = async(project) => {
    var sql = `
            SELECT * FROM project WHERE(name = '${project.name}'
                AND start_date = $ { project.start_date }
                AND end_date = $ { project.end_date })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findProjectByNameStart = async(project) => {
    var sql = `
            SELECT * FROM project WHERE(name = '${project.name}'
                AND start_date = $ { project.start_date })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectByNameEnd = async(project) => {
    var sql = `
            SELECT * FROM project WHERE(name = '${project.name}'
                AND end_date = $ { project.end_date })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectByStartEnd = async(project) => {
    var sql = `
            SELECT * FROM project WHERE(start_date = '${project.start_date}'
                AND end_date = $ { project.end_date })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const updateProjectName = async(project) => {
    try {
        const results = findProjectByNameStartEnd(project).then(async foundProject => {
            if (foundProject !== undefined) {
                var sql = `
            UPDATE project SET name = '${project.newname}'
            WHERE personid = $ { foundProject.projectid }
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

const updateProjectStart = async(project) => {
    try {
        const results = findProjectByNameStartEnd(project).then(async foundProject => {
            if (foundProject !== undefined) {
                var sql = `
            UPDATE project SET start_date = '${project.newstart}'
            WHERE personid = $ { foundProject.projectid }
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

const updateProjectEnd = async(project) => {
    try {
        const results = findProjectByNameStartEnd(project).then(async foundProject => {
            if (foundProject !== undefined) {
                var sql = `
            UPDATE project SET end_date = '${project.newend}'
            WHERE personid = $ { foundProject.projectid }
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
    delet,
    deleteAll,
    findByName,
    findByStart,
    findByEnd,
    findByNameStartEnd,
    findByNameStart,
    findByNameEnd,
    findByStartEnd,
    updateName,
    updateStart,
    updateEnd,
    showAll
}