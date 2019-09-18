const db = require('../db');
const pool = db.pool;

module.exports = {
    addFavorite(input){
        return pool.query('INSERT INTO accounts_recipes(recipe_id, account_id) VALUES($1, $2)',
            [input.recipeid, input.accountid])
    },
    getFavorites(input){
        return pool.query('SELECT recipes.username, recipeid, recipetitle, image, description FROM accounts ' +
            'INNER JOIN accounts_recipes ON(accounts.accountid = accounts_recipes.account_id) INNER JOIN recipes ON ' +
            '(recipes.recipeid = accounts_recipes.recipe_id) WHERE accounts.accountid = $1', [input])
    },
    checkFavorites(input){
        return pool.query('SELECT * FROM accounts_recipes WHERE recipe_id=$1 AND account_id=$2',
            [input.recipeid, input.accountid])
    }
};