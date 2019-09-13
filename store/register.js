const db = require('../db');
const pool = db.pool;

module.exports = {

    //check to see if account exists already
    checkAccount({username}){
        return pool.query('SELECT * from accounts WHERE username=$1', [username])
    },

    registerAccount({username, password}) {
        console.log("Register a new user to the database");
        const {saltKey, passwordHash} = db.hashPassword(password);
        console.log(username);
        console.log(passwordHash);
        console.log(saltKey);
        // pool.query('SELECT * from accounts WHERE username=$1', [username], (error, user)=> {
        //     if(error){
        //         console.log(error);
        //     }
        //     console.log("check user in registerAccount");
        //     console.log(user);
        //     if(user.rowCount > 0){
        //         let alreadyExist = {message: "This username is already in use"};
        //         console.log(alreadyExist);
        //         return alreadyExist;
        //     }else{
        //     }
        // })
        return pool.query('INSERT INTO accounts(username, passwordhash, salt) VALUES($1, $2, $3)',
            [username, passwordHash, saltKey]
        )
        // return pool.query('INSERT INTO accounts(username, passwordhash, salt) VALUES($1, $2, $3)',
        //     [username, passwordHash, saltKey]
        // )
    }
};
