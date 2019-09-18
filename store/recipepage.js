const db = require('../db');
const pool = db.pool;


module.exports = {
    getRecipe(recipeID){
        return pool.query('SELECT * FROM recipes where recipeid=$1', [recipeID])
    }
};