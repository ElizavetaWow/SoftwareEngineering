const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const create = (req, res) => {
    const rightt = req.body
    createRightt(rightt).then((status) => {
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
    const rightt = req.body
    deleteRightt(rightt).then((status) => {
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
        var sql = `DELETE FROM rightt`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM rightt")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}

const findByName = (req, res) => {
    const rightt = req.body
    findRighttByName(rightt).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findRighttByName = async(rightt) => {
    var sql = `
            SELECT * FROM rightt WHERE name = '${rightt.name}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findById = (req, res) => {
    const rightt = req.body
    findRighttById(rightt).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findRighttById = async(rightt) => {
    var sql = `
            SELECT * FROM rightt WHERE rightid = ${ rightt.rightid }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const createRightt = async(rightt) => {
    try {
        const results = findRighttByName(rightt).then(async foundRightt => {
            if (foundRightt == undefined) {
                var sql = `
            INSERT INTO rightt(name) VALUES('${rightt.name})
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

const deleteRightt = async(rightt) => {
    try {
        const results = findRighttByName(rightt).then(async foundRightt => {
            if (foundRightt !== undefined) {
                var sql = `
            DELETE FROM rightt WHERE rightid = ${ foundRightt.rightid }
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

const updateRighttName = async(rightt) => {
    try {
        const results = findRighttByName(rightt).then(async foundRightt => {
            if (foundRightt !== undefined) {
                var sql = `
            UPDATE rightt SET name = '${rightt.newname}'
            WHERE rightid = ${ foundRightt.rightid }
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
    createRightt,
    delet,
    deleteAll,
    deleteRightt,
    findByName,
    findRighttByName,
    findRighttById,
    updateRighttName,
    showAll,
    findById
}