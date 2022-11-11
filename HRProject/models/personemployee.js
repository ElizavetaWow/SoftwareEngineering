const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const addPersonEmployee = async(data) => {
    try {
        const results = findRecordByPersonEmployee(data).then(async foundRecord => {
            if (foundRecord == undefined) {
                var sql = `INSERT INTO personright(person_personid, employee_personid) VALUES('${data.person_personid}', '${data.employee_personid}')`;
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

const findRecordByEmployee = async(personid) => {
    var sql = `
            SELECT * FROM personright WHERE employee_personid = ${personid}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findRecordByPerson = async(personid) => {
    var sql = `
            SELECT * FROM personright WHERE person_personid = ${personid}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findRecordByPersonEmployee = async(data) => {
    var sql = `
            SELECT * FROM personright WHERE (person_personid = ${data.person_personid} AND employee_personid = ${data.employee_personid})
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findByPerson = (req, res) => {
    const data = req.body
    findRecordByPerson(data).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByEmployee = (req, res) => {
    const data = req.body
    findRecordByEmployee(data).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

module.exports = {
    addPersonEmployee,
    findByPerson,
    findByEmployee,
    findRecordByPersonEmployee
}