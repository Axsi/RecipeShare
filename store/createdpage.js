const db = require('../db');
const pool = db.pool;

module.exports = {
    getCreations(input){
        return pool.query('SELECT * FROM recipes WHERE creator=$1', [input])
    }
};