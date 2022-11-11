const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const create = (req, res) => {
    const skill = req.body
    createSkill(skill).then((status) => {
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
    const skill = req.body
    deleteSkill(skill).then((status) => {
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
        var sql = `DELETE FROM skill`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM skill")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}

const findById = (req, res) => {
    const skill = req.body
    findSkillById(skill.id).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findSkillById = async(skillid) => {
    var sql = `
            SELECT * FROM skill WHERE skillid = ${ skillid }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByName = (req, res) => {
    const skill = req.body
    findSkillByName(skill).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const updateName = (req, res) => {
    const skill = req.body
    updateSkillName(skill).then((status) => {
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

const createSkill = async(skill) => {
    try {
        const results = findSkillByName(skill).then(async foundSkill => {
            if (foundSkill == undefined) {
                var sql = `
            INSERT INTO skill(name, description) VALUES('${skill.name}', '${skill.description}')
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

const deleteSkill = async(skill) => {
    try {
        const results = findSkillByName(skill).then(async foundSkill => {
            if (foundSkill !== undefined) {
                var sql = `
            DELETE FROM skill WHERE skillid = ${ foundSkill.skillid }
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

const findSkillByName = async(skill) => {
    var sql = `
            SELECT * FROM grade WHERE name = '${skill.name}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const updateSkillName = async(skill) => {
    try {
        const results = findSkillByName(skill).then(async foundSkill => {
            if (foundSkill !== undefined) {
                var sql = `
            UPDATE skill SET name = '${skill.newname}'
            WHERE skillid = ${ foundSkill.skillid }
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
    createSkill,
    delet,
    deleteSkill,
    deleteAll,
    findByName,
    findSkillByName,
    updateName,
    updateSkillName,
    showAll,
    findById
}