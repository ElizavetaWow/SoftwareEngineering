const { Pool } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);


const create = (req, res) => {
    const person = req.body
    createPerson(person).then((status) => {
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
    const person = req.body
    deletePerson(person).then((status) => {
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
        var sql = `DELETE FROM person`;
        await pool.query(sql);
        res.status(200).json({ "status": true, "result": 'Operation successful!' })
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ "status": false, "result": "Request Failed!" })
    }
}

const showAll = async(req, res) => {
    const results = await pool.query("SELECT * FROM person")
        .then((data) => {
            return data.rows;
        })
        .catch(() => {
            throw new Error("Request failed");
        });

    res.status(200).send(JSON.stringify(results));
}

const findByName = (req, res) => {
    const person = req.body
    findPersonByName(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByEmail = (req, res) => {
    const person = req.body
    findPersonByEmail(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByWorkPhoneNumber = (req, res) => {
    const person = req.body
    findPersonByWorkPhoneNumber(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByPersonalPhoneNumber = (req, res) => {
    const person = req.body
    findPersonByPersonalPhoneNumber(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByComment = (req, res) => {
    const person = req.body
    findPersonByComment(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByIsEmployee = (req, res) => {
    const person = req.body
    findPersonByIsEmployee(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNameEmailWorkPersonalNumberCommentIsEmployee = (req, res) => {
    const person = req.body
    findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNameEmail = (req, res) => {
    const person = req.body
    findPersonByNameEmail(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNameWorkPhoneNumber = (req, res) => {
    const person = req.body
    findPersonByNameWorkPhoneNumber(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByEmailPersonalPhoneNumber = (req, res) => {
    const person = req.body
    findPersonByEmailPersonalPhoneNumber(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByEmailWorkPhoneNumber = (req, res) => {
    const person = req.body
    findPersonByEmailWorkPhoneNumber(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNamePersonalPhoneNumber = (req, res) => {
    const person = req.body
    findPersonByNamePersonalPhoneNumber(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNameComment = (req, res) => {
    const person = req.body
    findPersonByNameComment(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findById = (req, res) => {
    const person = req.body
    findPersonById(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const findByNameIsEmployee = (req, res) => {
    const person = req.body
    findPersonByNameIsEmployee(person).then((results) => {
        res.status(200).json(JSON.stringify(results))
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
}

const updateName = (req, res) => {
    const person = req.body
    updatePersonName(person).then((status) => {
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

const updateEmail = (req, res) => {
    const person = req.body
    updatePersonEmail(person).then((status) => {
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

const updateWorkPhoneNumber = (req, res) => {
    const person = req.body
    updatePersonWorkPhoneNumber(person).then((status) => {
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

const updatePersonalPhoneNumber = (req, res) => {
    const person = req.body
    updatePersonPersonalPhoneNumber(person).then((status) => {
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

const updateComment = (req, res) => {
    const person = req.body
    updatePersonComment(person).then((status) => {
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

const updateIsEmployee = (req, res) => {
    const person = req.body
    updatePersonIsEmployee(person).then((status) => {
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

const createPerson = async(person) => {
    try {
        const results = findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then(async foundPerson => {
            if (foundPerson == undefined) {
                var sql = `
            INSERT INTO person(name, email, workphonenumber, personalphonenumber, "Comment", isemployee) VALUES('${person.name}', 
                              '${person.email}', '${person.workphonenumber}', '${person.personalphonenumber}', ${person.comment}, ${person.isemployee})
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

const deletePerson = async(person) => {
    try {
        const results = findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then(async foundPerson => {
            if (foundProject !== undefined) {
                var sql = `
            DELETE FROM person WHERE personid = ${ foundPerson.personid }
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

const findPersonByName = async(person) => {
    var sql = `
            SELECT * FROM person WHERE name = '${person.name}'
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByEmail = async(person) => {
    var sql = `
            SELECT * FROM person WHERE email = ${person.email}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByWorkPhoneNumber = async(person) => {
    var sql = `
            SELECT * FROM person WHERE workphonenumber = ${person.workphonenumber}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByPersonalPhoneNumber = async(person) => {
    var sql = `
            SELECT * FROM person WHERE personalphonenumber = ${person.personalphonenumber}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByComment = async(person) => {
    var sql = `
            SELECT * FROM person WHERE "Comment" = ${person.comment}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByIsEmployee = async(person) => {
    var sql = `
            SELECT * FROM person WHERE isemployee = ${person.isemployee}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}


const findPersonById = async(personid) => {
    var sql = `
            SELECT * FROM project WHERE personid = ${personid}
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findPersonByNameEmailWorkPersonalNumberCommentIsEmployee = async(person) => {
    var sql = `
            SELECT * FROM person WHERE(name = '${person.name}'
                AND email = '${ person.email }'
                AND workphonenumber = ${ person.workphonenumber }
                AND personalphonenumber = ${person.personalphonenumber}
                AND "Comment" = '${person.comment}'
                AND isemployee = ${person.isemployee}) 
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const findPersonByNameEmail = async(person) => {
    var sql = `
            SELECT * FROM person WHERE(name = '${person.name}'
                AND email = '${ person.email }')
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByNameWorkPhoneNumber = async(person) => {
    var sql = `
            SELECT * FROM person WHERE(name = '${person.name}'
                AND workphonenumber = ${ person.workphonenumber })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByNamePersonalPhoneNumber = async(person) => {
    var sql = `
            SELECT * FROM person WHERE(name = '${person.name}'
                AND personalphonenumber = ${ person.personalphonenumber })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}


const findPersonByEmailWorkPhoneNumber = async(person) => {
    var sql = `
            SELECT * FROM person WHERE(email = '${person.email}'
                AND workphonenumber = ${ person.workphonenumber })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}


const findPersonByEmailPersonalPhoneNumber = async(person) => {
    var sql = `
            SELECT * FROM person WHERE(email = '${person.email}'
                AND personalphonenumber = ${ person.personalphonenumber })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByNameComment = async(person) => {
    var sql = `
            SELECT * FROM person WHERE(name = '${person.name}'
                AND "Comment" = '${ person.comment }')
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}

const findPersonByNameIsEmployee = async(person) => {
    var sql = `
            SELECT * FROM person WHERE(name = '${person.name}'
                AND isemployee = ${ person.isemployee })
            `;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows;
        })
    return results;
}


const updatePersonName = async(person) => {
    try {
        const results = findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then(async foundPerson => {
            if (foundPerson !== undefined) {
                var sql = `
            UPDATE person SET name = '${person.newname}'
            WHERE personid = ${ foundPerson.personid }
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

const updatePersonEmail = async(person) => {
    try {
        const results = findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then(async foundPerson => {
            if (foundPerson !== undefined) {
                var sql = `
            UPDATE person SET email = '${person.newemail}'
            WHERE personid = ${ foundPerson.personid }
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

const updatePersonWorkPhoneNumber = async(person) => {
    try {
        const results = findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then(async foundPerson => {
            if (foundPerson !== undefined) {
                var sql = `
            UPDATE person SET workphonenumber = '${person.newworkphonenumber}'
            WHERE personid = ${ foundPerson.personid }
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

const updatePersonPersonalPhoneNumber = async(person) => {
    try {
        const results = findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then(async foundPerson => {
            if (foundPerson !== undefined) {
                var sql = `
            UPDATE person SET personalphonenumber = '${person.newpersonalphonenumber}'
            WHERE personid = ${ foundPerson.personid }
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

const updatePersonComment = async(person) => {
    try {
        const results = findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then(async foundPerson => {
            if (foundPerson !== undefined) {
                var sql = `
            UPDATE person SET "Comment" = '${person.newcomment}'
            WHERE personid = ${ foundPerson.personid }
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

const updatePersonIsEmployee = async(person) => {
    try {
        const results = findPersonByNameEmailWorkPersonalNumberCommentIsEmployee(person).then(async foundPerson => {
            if (foundPerson !== undefined) {
                var sql = `
            UPDATE person SET isemployee = '${person.newisemployee}'
            WHERE personid = ${ foundPerson.personid }
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
    findByName,
    findByEmail,
    findByWorkPhoneNumber,
    findByPersonalPhoneNumber,
    findByComment,
    findByIsEmployee,
    findByNameEmailWorkPersonalNumberCommentIsEmployee,
    findByNameEmail,
    findByNameWorkPhoneNumber,
    findByNamePersonalPhoneNumber,
    findByEmailWorkPhoneNumber,
    findByEmailPersonalPhoneNumber,
    findByNameComment,
    findByNameIsEmployee,
    updateName,
    updateEmail,
    updateWorkPhoneNumber,
    updatePersonalPhoneNumber,
    updateComment,
    updateIsEmployee,
    showAll,
    findById
}