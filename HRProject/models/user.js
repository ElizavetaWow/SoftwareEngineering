const crypto = require('crypto');
const { Client } = require("pg");
const client = new Client({
    password: "root",
    user: "root",
    host: "postgres",
});
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
        .then(user => {
            delete user.password_digest
            res.status(201);
            res.sendFile(path.join(__dirname, '../public/index.html'));
        })
        .catch((err) => console.error(err))
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

const createUser = async(user) => {
    try {
        const client = new Client({
            password: "root",
            user: "root",
            host: "postgres",
        });
        var sql = `INSERT INTO employees(login, password_digest, token) VALUES('${user.username}', '${user.password_digest}', '${user.token}')`;
        await client.connect();
        await client.query(sql);
    } catch (error) {
        console.error(error.stack);

    } finally {
        await client.end();

        return user
    }

}

const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
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

const findUser = async(userReq) => {
    await client.connect();
    var sql = `SELECT * FROM employees WHERE login = '${ userReq.username }'`;
    const results = await client
        .query(sql)
        .then((data) => {
            return data.rows[0];
        })
    await client.end();
    return results;

}

const checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) => {
        const salt = foundUser.password_digest.slice(64);
        const originalPassHash = foundUser.password_digest.slice(0, 64);
        const currentPassHash = encryptPassowrd(reqPassword, salt);
        console.log(originalPassHash)
        console.log(currentPassHash)
        if (originalPassHash === currentPassHash) {
            resolve(originalPassHash === currentPassHash)
        } else {
            reject(new Error('Passwords do not match.'))
        }
    })
}

const updateUserToken = async(token, user) => {
    await client.connect();
    const results = await client
        .query(`
UPDATE employees SET token = ${ token }
WHERE id = ${ user.id })
`)
        .then((data) => {
            return data.rows[0]
        })
    await client.end();
    return results;
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

const findByToken = async(token) => {
    await client.connect();
    return await client
        .query(`
SELECT * FROM employees WHERE token = ${ token })
`).then((data) => data.rows[0])
    await client.end()
}

module.exports = {
    signup,
    signin,
}