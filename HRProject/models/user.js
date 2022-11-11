const crypto = require('crypto');
const { Pool, Client } = require("pg");

const credentials = {
    user: "root",
    host: "postgres",
    password: "root",
};
const pool = new Pool(credentials);
const path = require('path');

const signup = (req, res) => {
    const user = req.body
    hashPassword(user.password)
        .then((hashedPassword) => {
            delete user.password
            user.password_digest = hashedPassword
        })
        .then(() => createToken())
        .then(token => {
            user.token = token
        })
        .then(() => createUser(user))
        .then(() => {
            delete user.password_digest
            res.status(201);
            res.sendFile(path.join(__dirname, '../public/index.html'));
        })
        .catch((err) => console.error(err))
}

const signin = (req, res) => {
    const userReq = req.body
    let user

    findUser(userReq)
        .then(foundUser => {
            user = foundUser
            return checkPassword(userReq.password, foundUser)
        })
        .then(() => createToken())
        .then(token => updateUserToken(token, user))
        .then(() => {
            delete user.password_digest
            res.status(200);
            res.sendFile(path.join(__dirname, '../public/index.html'));
        })
        .catch((err) => console.error(err))
}

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}

const checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) => {
        const salt = foundUser.password_digest.slice(64, 96);
        const originalPassHash = foundUser.password_digest.slice(0, 64);
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

const createUser = async (user) => {
    try {
        var sql = `INSERT INTO employee(login, password_digest, token) VALUES('${user.username}', '${user.password_digest}', '${user.token}')`;
        await pool.query(sql);
    } catch (error) {
        console.error(error.stack);
    }

}

const findUser = async (userReq) => {
    var sql = `SELECT * FROM employee WHERE login = '${userReq.username}'`;
    const results = await pool
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    return results;
}

const updateUserToken = async (token, user) => {
    var sql = `UPDATE employee SET token = '${token}' WHERE personid = ${user.personid}`;
    await pool.query(sql);
}



const authenticate = (userReq) => {
    findByToken(userReq.token)
        .then((user) => {
            if (user.username == userReq.username) {
                return true
            } else {
                return false
            }
        })
}

const findByToken = async (token) => {
    return await pool.query(`SELECT * FROM employee WHERE token = '${token}'`).then((data) => data.rows[0])
}

module.exports = {
    signup,
    signin,
}