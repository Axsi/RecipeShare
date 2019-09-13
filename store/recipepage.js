const db = require('../db');
const pool = db.pool;


module.exports = {
    getRecipe(recipeID){
        console.log("Inside getRecipe in store");
        return pool.query('SELECT * FROM recipes where recipeid=$1', [recipeID])
    }
};