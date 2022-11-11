const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const addPersonRight = async(data) => {
    try {
        const results = findRecordByPersonRight(data).then(async foundRecord => {
            if (foundRecord == undefined) {
                var sql = `INSERT INTO personright(person_personid, right_rightid) VALUES('${data.personid}', '${data.rightid}')`;
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

const findRecordByRight = async(rightid) => {
    var sql = `
            SELECT * FROM personright WHERE right_rightid = ${rightid}
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

const findRecordByPersonRight = async(data) => {
    var sql = `
            SELECT * FROM personright WHERE (person_personid = ${data.personid} AND right_rightid = ${data.rightid})
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

const findByRight = (req, res) => {
    const data = req.body
    findRecordByRight(data).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

module.exports = {
    addPersonRight,
    findByPerson,
    findByRight,
    findRecordByPersonRight
}