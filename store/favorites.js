const db = require('../db');
const pool = db.pool;

module.exports = {
    addFavorite(input){
        console.log("Inside addFavorite() in store");
        console.log(input);
        return pool.query('INSERT INTO accounts_recipes(recipe_id, account_id) VALUES($1, $2)',
            [input.recipeid, input.accountid])
    }
};