const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const create = (req, res) => {
    const task = req.body
    createTask(task).then((status) => {
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
    const task = req.body
    deleteTask(task).then((status) => {
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
        var sql = `DELETE FROM task`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM task")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}
const findByHours = (req, res) => {
    const task = req.body
    findTaskByHours(task).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findById = (req, res) => {
    const task = req.body
    findTaskById(task.id).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByDescription = (req, res) => {
    const task = req.body
    findTaskByDescription(task).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findTaskByHours = async(task) => {
    var sql = `
            SELECT * FROM task WHERE hours = ${ task.hours }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findTaskById = async(taskid) => {
    var sql = `
            SELECT * FROM task WHERE taskid = ${taskid }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findTaskByDescription = async(task) => {
    var sql = `
            SELECT * FROM task WHERE description = ${ task.description }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findTaskByHoursDescriptionProject = async(task) => {
    var sql = `
            SELECT * FROM task WHERE (description = ${ task.description } AND hours = ${ task.hours }
            AND project_projectid = ${ task.projectid })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const createTask = async(task) => {
    try {
        const results = findTaskByHoursDescriptionProject(task).then(async foundTask => {
            if (foundTask == undefined) {
                var sql = `
            INSERT INTO task(description, hours, project_projectid) VALUES('${task.description}', '${task.hours}', '${task.project_projectid}')
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

const deleteTask = async(task) => {
    try {
        const results = findTaskByHoursDescriptionProject(task).then(async foundTask => {
            if (foundTask !== undefined) {
                var sql = `
            DELETE FROM task WHERE taskid = ${ foundTask.taskid }
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

const updateTask = (req, res) => {
    const task = req.body
    updateTaskHours(task).then((status) => {
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

const updateTaskHours = async(task) => {
    try {
        const results = findTaskByHoursDescriptionProject(task).then(async foundTask => {
            if (foundTask !== undefined) {
                var sql = `
            UPDATE task SET hours = '${task.newhours}'
            WHERE taskid = ${ foundTask.taskid }
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
    createTask,
    delet,
    deleteTask,
    deleteAll,
    findByHours,
    findById,
    findTaskByHours,
    findTaskById,
    updateTask,
    updateTaskHours,
    showAll,
    findByDescription
}