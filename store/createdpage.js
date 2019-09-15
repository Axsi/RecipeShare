const db = require('../db');
const pool = db.pool;

module.exports = {
    getCreations(input){
        console.log("Inside getCreations");
        // console.log(typeof input);
        // console.log(input);
        return pool.query('SELECT * FROM recipes WHERE creator=$1', [input])
    }
};