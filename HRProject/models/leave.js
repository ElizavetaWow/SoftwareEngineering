const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);


const create = (req, res) => {
    const leave = req.body
    createLeave(leave).then((status) => {
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
    const leave = req.body
    deleteLeave(leave).then((status) => {
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
        var sql = `DELETE FROM leave`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM leave")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}
const findById = async(req, res) => {
    const leave = req.body
    findLeaveById(leave.id).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}
const findLeaveById = async(leaveid) => {
    var sql = `SELECT * FROM leave WHERE leaveid = ${ leaveid }`;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}
const findByStart = (req, res) => {
    const leave = req.body
    findLeaveByStart(leave).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}
const findByStartEndIsVacation = (req, res) => {
    const leave = req.body
    findLeaveByStartEndIsVacation(leave).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}
const findLeaveByStartEndIsVacation = async(leave) => {
    var sql = `
            SELECT * FROM leave WHERE(start_date = '${leave.start_date}'
                AND end_date = '${ leave.end_date }'
                AND isvacation = ${ leave.isvacation }) 
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}
const findByStartIsVacation = (req, res) => {
    const leave = req.body
    findLeaveByStartIsVacation(leave).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}
const findLeaveByStartIsVacation = async(leave) => {
    var sql = `
            SELECT * FROM leave WHERE(start_date = '${leave.start_date}'
                AND isvacation = ${ leave.isvacation })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByEndIsVacation = (req, res) => {
    const leave = req.body
    findLeaveByEndIsVacation(leave).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}
const findLeaveByEndIsVacation = async(leave) => {
    var sql = `
            SELECT * FROM leave WHERE(end_date = '${leave.end_date}'
                AND isvacation = ${ leave.isvacation })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByEnd = (req, res) => {
    const leave = req.body
    findLeaveByEnd(leave).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByStartEnd = (req, res) => {
    const leave = req.body
    findLeaveByStartEnd(leave).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}
const findLeaveByStart = async(leave) => {
    var sql = `
            SELECT * FROM leave WHERE start_date = ${ leave.start_date }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findLeaveByEnd = async(leave) => {
    var sql = `
            SELECT * FROM leave WHERE end_date = ${ leave.end_date }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findLeaveByStartEnd = async(leave) => {
    var sql = `
            SELECT * FROM leave WHERE(start_date = '${leave.start_date}'
                AND end_date = ${ leave.end_date })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}
const findByIsVacation = (req, res) => {
    const leave = req.body
    findLeaveByIsVacation(leave).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}
const findLeaveByIsVacation = async(leave) => {
    var sql = `
            SELECT * FROM leave WHERE isvacation = ${ leave.isvacation })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}
const updateLeaveStart = async(leave) => {
    try {
        const results = findLeaveByStartEndIsVacation(leave).then(async foundLeave => {
            if (foundLeave !== undefined) {
                var sql = `
            UPDATE leave SET start_date = '${leave.newstart}'
            WHERE leaveid = ${ foundLeave.leaveid }
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
const updateLeaveEnd = async(leave) => {
    try {
        const results = findLeaveByStartEndIsVacation(leave).then(async foundLeave => {
            if (foundLeave !== undefined) {
                var sql = `
            UPDATE leave SET end_date = '${leave.newend}'
            WHERE leaveid = ${ foundLeave.leaveid }
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
const updateLeaveIsVacation = async(leave) => {
    try {
        const results = findLeaveByStartEndIsVacation(persleaveon).then(async foundLeave => {
            if (foundLeave !== undefined) {
                var sql = `
            UPDATE leave SET isvacation = '${leave.newisvacation}'
            WHERE leaveid = ${ foundLeave.leaveid }
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
    findById,
    findByIsVacation,
    findByStartEndIsVacation,
    findByStartIsVacation,
    findByEndIsVacation,
    findByStart,
    findByEnd,
    findByStartEnd,
    updateLeaveStart,
    updateLeaveEnd,
    updateLeaveIsVacation,
    showAll,
    findLeaveById,
    findLeaveByIsVacation,
    findLeaveByStartEndIsVacation,
    findLeaveByStartIsVacation,
    findLeaveByEndIsVacation,
    findLeaveByStart,
    findLeaveByEnd,
    findLeaveByStartEnd,
}