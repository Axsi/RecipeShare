const pg = require('pg/lib');
const env = require('dotenv').config();
const crypto = require('crypto');
const tables = require('./migrations/tables');

//pool config object, every field is optional
const config = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: process.env.DB_MAX,
    idleTimeoutMillis: process.env.DB_IDLE_TIMEOUT
};

const pool = new pg.Pool(config);

//whenever the pool establishes a new client connection to the postgresql backend, it will emit the specified connect
//event
pool.on('connect', () => {
    console.log('Connected to the database!');
});
//gotta test the character limit
const createTables = async () =>{
    try{
        let accountRes = await pool.query(tables.accountTable);
        console.log(accountRes);
        let recipeRes = await pool.query(tables.recipeTable);
        console.log(recipeRes);
        let favoriteRes = await pool.query(tables.favoriteTable);
        console.log(favoriteRes);
    }catch(err){
        console.log("Error: Table could not be created");
        console.log(err);
    }
};

const getUsers = (request, response) =>{
    pool.query('SELECT * FROM accounts', (error, results)=>{
        if(error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
};

//========= Helper Functions ==========
function generateSalt(){
    return crypto.randomBytes(4).toString('hex');
}

function hashPassword(password){
    let salt = generateSalt();
    let hashedPassword = crypto.createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return{
        saltKey: salt,
        passwordHash: hashedPassword
    };
}
// return pool.query('INSERT INTO accounts(username, passwordhash, salt) VALUES($1, $2, $3)',
//     [username, passwordHash, saltKey]

function authenticate(loginData){
    //search database for user the username entered by the user
    console.log('are we reaching authenticate?');
    console.log(loginData.username);
    console.log(loginData.password);
    return pool.query('SELECT * FROM accounts WHERE username= $1', [loginData.username])
        .then(function(response){

            console.log("what is response?");
            console.log(response);

            if(response.rows == 0){
                return false;
            }
            console.log(response.rows[0].passwordhash);
            //username is found so we take the salt and password saved along with the username and
            //combine it with the user entered password to check if the password we have in our DB matches the user
            // entered one
            //should change password to salt in database
            let hashedPassword = crypto.createHmac("sha256", response.rows[0].salt)
                .update(loginData.password)
                .digest("hex");

            console.log("what is hashedpassword?");
            console.log(hashedPassword);

            return hashedPassword === response.rows[0].passwordhash;
        })
}

module.exports = {
    pool,
    createTables,
    getUsers,
    authenticate,
    hashPassword,
};

require('make-runnable');