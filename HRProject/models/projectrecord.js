const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);


const create = (req, res) => {
    const projectrecord = req.body
    createProjectrecord(projectrecord).then((status) => {
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
    const projectrecord = req.body
    deleteProjectrecord(projectrecord).then((status) => {
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
        var sql = `DELETE FROM projectrecord`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM projectrecord")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}

const findByHoursperweek = (req, res) => {
    const projectrecord = req.body
    findProjectrecordByHoursperweek(projectrecord).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByStart = (req, res) => {
    const projectrecord = req.body
    findProjectrecordByStart(projectrecord).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByEnd = (req, res) => {
    const projectrecord = req.body
    findProjectrecordByEnd(projectrecord).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByStartEnd = (req, res) => {
    const projectrecord = req.body
    findProjectrecordByStartEnd(projectrecord).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findById = async(req, res) => {
    const projectrecord = req.body
    findProjectrecordById(projectrecord.id).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByProject = (req, res) => {
    const projectrecord = req.body
    findProjectrecordByProject(projectrecord).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByPerson = (req, res) => {
    const projectrecord = req.body
    findProjectrecordByPerson(projectrecord).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByPersonProject = (req, res) => {
    const projectrecord = req.body
    findProjectrecordByPersonProject(projectrecord).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}


const findProjectrecordByPersonProject = async(projectrecord) => {
    var sql = `
            SELECT * FROM projectrecord WHERE (person_personid = ${projectrecord.personid} AND project_projectid = ${projectrecord.projectid})
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findProjectrecordByPerson = async(projectrecord) => {
    var sql = `
            SELECT * FROM projectrecord WHERE person_personid = ${projectrecord.personid}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectrecordByProject = async(projectrecord) => {
    var sql = `
            SELECT * FROM projectrecord WHERE project_projectid = ${projectrecord.projectid}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectrecordById = async(projectrecordid) => {
    var sql = `SELECT * FROM projectrecord WHERE recordid = ${ projectrecordid }`;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findProjectrecordByHoursperweek = async(projectrecord) => {
    var sql = `
            SELECT * FROM projectrecord WHERE hoursperweek = '${projectrecord.hoursperweek}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectrecordByStart = async(projectrecord) => {
    var sql = `
            SELECT * FROM projectrecord WHERE start_date = ${ projectrecord.start_date }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectrecordByEnd = async(projectrecord) => {
    var sql = `
            SELECT * FROM projectrecord WHERE end_date = ${ projectrecord.end_date }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findProjectrecordByStartEnd = async(projectrecord) => {
    var sql = `
            SELECT * FROM projectrecord WHERE(start_date = '${projectrecord.start_date}'
                AND end_date = ${ projectrecord.end_date })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const updateStart = (req, res) => {
    const projectrecord = req.body
    updateProjectrecordStart(projectrecord).then((status) => {
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
    const projectrecord = req.body
    updateProjectrecordEnd(projectrecord).then((status) => {
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

const updateHoursperweek = (req, res) => {
    const projectrecord = req.body
    updateProjectrecordHoursperweek(projectrecord).then((status) => {
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

const updateProjectrecordHoursperweek = async(projectrecord) => {
    try {
        const results = findProjectrecordByPersonProject(projectrecord).then(async foundProjectrecord => {
            if (foundProjectrecord !== undefined) {
                var sql = `
            UPDATE projectrecord SET hoursperweek = '${projectrecord.newhoursperweek}'
            WHERE recordid = ${ foundProjectrecord.recordid }
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

const updateProjectrecordStart = async(projectrecord) => {
    try {
        const results = findProjectrecordByPersonProject(projectrecord).then(async foundProjectrecord => {
            if (foundProjectrecord !== undefined) {
                var sql = `
            UPDATE projectrecord SET start_date = '${projectrecord.newstart}'
            WHERE recordid = ${ foundProjectrecord.recordid }
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

const updateProjectrecordEnd = async(projectrecord) => {
    try {
        const results = findProjectrecordByPersonProject(projectrecord).then(async foundProjectrecord => {
            if (foundProjectrecord !== undefined) {
                var sql = `
            UPDATE projectrecord SET end_date = '${projectrecord.newend}'
            WHERE recordid = ${ foundProject.projectid }
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
    findByHoursperweek,
    findByStart,
    findByEnd,
    findByStartEnd,
    updateStart,
    updateEnd,
    showAll,
    findById,
    findByProject,
    findByPerson,
    findByPersonProject,
    updateHoursperweek
}