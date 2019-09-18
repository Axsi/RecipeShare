const db = require('../db');
const pool = db.pool;

module.exports = {

    searchRecipe(input){
        return pool.query('SELECT * FROM recipes WHERE lower(recipetitle) LIKE lower($1) OR lower(ingredients) ' +
            'LIKE lower($1)', ['%'+input+'%'])
    },
    recentRecipes(){
        //made use of the recipeId instead of actual time_stamp
        return pool.query('SELECT * FROM recipes ORDER BY recipeid DESC LIMIT 8');
    },
    mealTypeRecipes(input){
            return pool.query('SELECT * FROM recipes WHERE mealtype=$1', [input]);
    }
};