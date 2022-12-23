const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const addPersonSkill = async(data) => {
    try {
        const results = findRecordByPersonSkill(data).then(async foundRecord => {
            if (foundRecord == undefined) {
                var sql = `INSERT INTO personskill(person_personid, skill_skillid) VALUES('${data.body.personid}', '${data.body.skillid}')`;
                await pool.query(sql);
                return true;
            }
            console.log('already exists');
            return false;
        })
        return results;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
}

const findRecordBySkill = async(skillid) => {
    var sql = `
            SELECT * FROM personskill WHERE skill_skillid = '${skillid}'
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
            SELECT * FROM personskill JOIN skill on personskill.skill_skillid=skill.skillid WHERE person_personid = '${personid}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findRecordByPersonSkill = async(data) => {
    var sql = `
            SELECT * FROM personskill WHERE (person_personid = '${data.body.personid}' AND skill_skillid = '${data.body.skillid}')
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findByPerson = (req, res) => {
    const data = req.params.id
    findRecordByPerson(data).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findBySkill = (req, res) => {
    const data = req.body
    findRecordBySkill(data).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

module.exports = {
    addPersonSkill,
    findByPerson,
    findBySkill,
    findRecordByPersonSkill
}