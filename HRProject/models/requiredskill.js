const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);

const addRequiredSkill = async(data) => {
    try {
        const results = findRecordByVacancySkill(data).then(async foundRecord => {
            if (foundRecord == undefined) {
                var sql = `INSERT INTO requiredskill(vacancy_vacancyid, skill_skillid) VALUES('${data.vacancyid}', '${data.skillid}')`;
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

const findRecordBySkill = async(skillid) => {
    var sql = `
            SELECT * FROM requiredskill WHERE skill_skillid = ${skillid}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findRecordByVacancy = async(vacancyid) => {
    var sql = `
            SELECT * FROM requiredskill WHERE vacancy_vacancyid = ${vacancyid}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findRecordByVacancySkill = async(data) => {
    var sql = `
            SELECT * FROM requiredskill WHERE (vacancy_vacancyid = ${data.vacancyid} AND skill_skillid = ${data.skillid})
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findByVacancy = (req, res) => {
    const data = req.body
    findRecordByVacancy(data).then((results) => {
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
    addRequiredSkill,
    findByVacancy,
    findBySkill,
    findRecordByVacancySkill
}