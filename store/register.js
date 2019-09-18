const db = require('../db');
const pool = db.pool;

module.exports = {
    //check to see if account exists already
    checkAccount({username}){
        return pool.query('SELECT * from accounts WHERE username=$1', [username])
    },
    registerAccount({username, password}) {
        const {saltKey, passwordHash} = db.hashPassword(password);
        return pool.query('INSERT INTO accounts(username, passwordhash, salt) VALUES($1, $2, $3)',
            [username, passwordHash, saltKey]
        )
    }
};
