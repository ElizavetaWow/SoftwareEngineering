const crypto = require('crypto');
const { Pool } = require("pg");
const Grade = require('./models/grade.js');
const credentials = {
    employee: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);


const create = (req, res) => {
    const employee = req.body
    hashPassword(employee.password)
        .then((hashedPassword) => {
            delete employee.password
            employee.password_digest = hashedPassword
        })
        .then(() => createToken())
        .then(token => {
            employee.token = token
        })
        .then(() => createEmployee(employee))
        .then((status) => {
            delete employee.password_digest
            if (status == 'true') {
                res.status(201).json({ "status": true, "result": 'Signup successful!' })
            } else if (status == 'already exists') {
                res.status(200).json({ "status": false, "result": "Already exists!" })
            } else {
                res.status(200).json({ "status": false, "result": "Request Failed!" })
            }
        }).catch((error) => {
            console.log(error)
            res.status(200).json({ "status": false, "result": "Request Failed!" })
        })
}

const signin = (req, res) => {
    const employeeReq = req.body
    let employee

    findEmployeeByLogin(employeeReq)
        .then(foundEmployee => {
            employee = foundEmployee
            return checkPassword(employeeReq.password, foundEmployee)
        })
        .then(() => createToken())
        .then(token => updateEmployeeToken(token, employee))
        .then(() => {
            delete employee.password_digest
            res.status(200).json({ "status": true, "result": 'Signin successful!' })
            res.status(200);
        })
        .catch((error) => {
            console.log(error)
            res.status(200).json({ "status": false, "result": "Request Failed!" })
        })
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM employee")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}

const createEmployee = async(employee) => {
    try {
        const results = findEmployeeByLogin(employee).then(async foundEmployee => {
            if (foundEmployee == undefined) {
                var sql = `INSERT INTO employee(login, password_digest, token) VALUES('${employee.login}', '${employee.password_digest}', '${employee.token}')`;
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

const deleteEmployee = async(employee) => {
    try {
        const results = findEmployeeById(employee.id).then(async foundEmployee => {
            if (foundEmployee !== undefined) {
                var sql = `DELETE FROM employee WHERE personid = ${ foundEmployee.personid }`;
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

const delet = (req, res) => {
    const employee = req.body
    deleteEmployee(employee).then((status) => {
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
        var sql = `DELETE FROM employee`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const findEmployeeById = async(employeeId) => {
    var sql = `SELECT * FROM employee WHERE personId = ${employeeId}`;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findEmployeeByToken = async(token) => {
    const results = await pool.query(`SELECT * FROM employee WHERE token = '${token}'`).then((data) => {
        return data.rows[0]
    })
    return results
}

const findEmployeeByLogin = async(employee) => {
    var sql = `SELECT * FROM employee WHERE login = '${employee.login}'`;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findByDismissDate = (req, res) => {
    const employee = req.body
    findEmployeeByDismissDate(employee).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findEmployeeByDismissDate = async(employee) => {
    var sql = `
            SELECT * FROM employee WHERE dismiss_date = '${employee.dismiss_date}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByOneproject = (req, res) => {
    const employee = req.body
    findEmployeeByOneproject(employee).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findEmployeeByOneproject = async(employee) => {
    var sql = `
            SELECT * FROM employee WHERE workingononeproject = ${ employee.workingononeproject }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByGrade = (req, res) => {
    const grade = req.body
    findEmployeeByGrade(grade).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findEmployeeByGrade = async(grade) => {
    foundGrade = Grade.findGradeByName(grade)
    var sql = `
            SELECT * FROM employee WHERE grade_gradeid = ${ foundGrade.gradeid }
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findByGradeOneproject = (req, res) => {
    const data = req.body
    findEmployeeByGradeOneproject(data).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByGradeDismissDate = (req, res) => {
    const data = req.body
    findEmployeeByGradeDismissDate(data).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByGradeOneprojectDismissDate = (req, res) => {
    const data = req.body
    findEmployeeByGradeOneprojectDismissDate(data).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findEmployeeByGradeOneproject = async(data) => {
    foundGrade = Grade.findGradeByName(data.grade_name)
    var sql = `
            SELECT * FROM employee WHERE (grade_gradeid = ${ foundGrade.gradeid } AND workingononeproject = ${ data.employee_workingononeproject })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findEmployeeByGradeDismissDate = async(data) => {
    foundGrade = Grade.findGradeByName(data.grade_name)
    var sql = `
            SELECT * FROM employee WHERE (grade_gradeid = ${ foundGrade.gradeid } AND dismiss_date = ${  data.employee_dismiss_date })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findEmployeeByGradeOneprojectDismissDate = async(data) => {
    foundGrade = Grade.findGradeByName(data.grade_name)
    var sql = `
            SELECT * FROM employee WHERE (grade_gradeid = ${ foundGrade.gradeid } 
                AND workingononeproject = ${ data.employee_workingononeproject } AND dismiss_date = ${ data.employee_dismiss_date })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const updateLogin = (req, res) => {
    const employee = req.body
    updateEmployeeLogin(employee).then((status) => {
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

const updatePassword = (req, res) => {
    findEmployeeByLogin(employee)
        .then(foundEmployee => {
            return checkPassword(employee.password, foundEmployee)
        })
        .then(() => {
            hashPassword(employee.newpassword)
                .then((hashedPassword) => {
                    employee.password_digest = hashedPassword
                    updateEmployeePassworddigest(employee)
                }).then((status) => {
                    if (status == 'true') {
                        res.status(200).json({ "status": true, "result": 'Operation successful!' })
                    } else {
                        res.status(200).json({ "status": false, "result": "Request Failed!" })
                    }
                })

        }).catch((error) => {
            console.log(error)
            res.status(200).json({ "status": false, "result": "Request Failed!" })
        })
}

const updateOneproject = (req, res) => {
    const employee = req.body
    updateEmployeeOneproject(employee).then((status) => {
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

const updateDismissDate = (req, res) => {
    const employee = req.body
    updateEmployeeDismissDate(employee).then((status) => {
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

const updateGrade = (req, res) => {
    const data = req.body
    updateEmployeeGrade(data).then((status) => {
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


const updateEmployeeLogin = async(employee) => {
    try {
        const results = findEmployeeByLogin(employee).then(async foundEmployee => {
            if (foundEmployee !== undefined) {
                var sql = `
            UPDATE employee SET login = '${employee.newlogin}'
            WHERE personid = ${ foundEmployee.personid }
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

const updateEmployeePassworddigest = async(employee) => {
    try {
        const results = findEmployeeByLogin(employee).then(async foundEmployee => {
            if (foundEmployee !== undefined) {
                var sql = `
            UPDATE employee SET password_digest = '${employee.password_digest}'
            WHERE personid = ${ foundEmployee.personid }
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

const updateEmployeeToken = async(token, employee) => {
    var sql = `UPDATE employee SET token = '${token}' WHERE personid = ${employee.personid}`;
    await pool.query(sql);
}

const updateEmployeeOneproject = async(employee) => {
    try {
        const results = findEmployeeById(employee.personid).then(async foundEmployee => {
            if (foundEmployee !== undefined) {
                var sql = `
            UPDATE employee SET workingononeproject = '${employee.workingononeproject}'
            WHERE personid = ${ foundEmployee.personid }
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

const updateEmployeeDismissDate = async(employee) => {
    try {
        const results = findEmployeeById(employee.personid).then(async foundEmployee => {
            if (foundEmployee !== undefined) {
                var sql = `
            UPDATE employee SET end_date = '${employee.newdismissdate}'
            WHERE personid = ${ foundEmployee.personid }
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

const updateEmployeeGrade = async(data) => {
    try {
        foundGrade = Grade.findGradeByName(data.grade_name)
        const results = findEmployeeById(data.employee_id).then(async foundEmployee => {
            if (foundEmployee !== undefined) {
                var sql = `
            UPDATE employee SET grade_gradeid = ${ foundGrade.gradeid }
            WHERE personid = ${foundEmployee.personid }
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


const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}

const checkPassword = (reqPassword, foundEmployee) => {
    return new Promise((resolve, reject) => {
        const salt = foundEmployee.password_digest.slice(64, 96);
        const originalPassHash = foundEmployee.password_digest.slice(0, 64);
        const currentPassHash = encryptPassowrd(reqPassword, salt);
        if (originalPassHash === currentPassHash) {
            resolve(originalPassHash === currentPassHash)
        } else {
            reject(new Error('Passwords do not match.'))
        }
    })
}

const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    return new Promise((resolve, reject) =>
        resolve(encryptPassowrd(password, salt) + salt)
    )
}

const encryptPassowrd = (password, salt) => {
    return crypto.scryptSync(password, salt, 32).toString('hex');
};


const authenticate = (employeeReq) => {
    findEmployeeByToken(employeeReq.token)
        .then((employee) => {
            if (employee.login == employeeReq.login) {
                return true
            } else {
                return false
            }
        })
}



module.exports = {
    create,
    signin,
    showAll,
    delet,
    deleteAll,
    findByDismissDate,
    findByOneproject,
    findByGrade,
    findByGradeOneproject,
    findByGradeDismissDate,
    findByGradeOneprojectDismissDate,
    updateLogin,
    updatePassword,
    updateOneproject,
    updateDismissDate,
    showAll,
    updateGrade
}