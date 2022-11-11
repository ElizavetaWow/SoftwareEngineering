const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const create = (req, res) => {
    const grade = req.body
    createGrade(grade).then((status) => {
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
    const grade = req.body
    deleteGrade(grade).then((status) => {
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
        var sql = `DELETE FROM grade`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM grade")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}

const findByName = (req, res) => {
    const grade = req.body
    findGradeByName(grade).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const updateName = (req, res) => {
    const grade = req.body
    updateGradeName(grade).then((status) => {
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

const createGrade = async(grade) => {
    try {
        const results = findGradeByName(grade).then(async foundGrade => {
            if (foundGrade == undefined) {
                var sql = `
            INSERT INTO grade(name, description) VALUES('${grade.name}', '${grade.description}')
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

const deleteGrade = async(grade) => {
    try {
        const results = findGradeByName(grade).then(async foundGrade => {
            if (foundGrade !== undefined) {
                var sql = `
            DELETE FROM grade WHERE gradeid = ${ foundGrade.gradeid }
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

const findGradeByName = async(grade) => {
    var sql = `
            SELECT * FROM grade WHERE name = '${grade.name}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const updateGradeName = async(grade) => {
    try {
        const results = findGradeByName(grade).then(async foundGrade => {
            if (foundGrade !== undefined) {
                var sql = `
            UPDATE grade SET name = '${grade.newname}'
            WHERE gradeid = ${ foundGrade.gradeid }
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

const findById = async(req, res) => {
    const grade = req.body
    findGradeById(grade.id).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findGradeById = async(gradeid) => {
    var sql = `SELECT * FROM grade WHERE gradeid = ${ gradeid }`;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

module.exports = {
    create,
    createGrade,
    delet,
    deleteGrade,
    deleteAll,
    findByName,
    updateName,
    updateGradeName,
    showAll,
    findGradeByName,
    findById
}