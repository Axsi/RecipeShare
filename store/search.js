const db = require('../db');
const pool = db.pool;

module.exports = {

    searchRecipe(input){
        //title, ingredient
        console.log("inside searchRecipe in store?");
        console.log(input);
        return pool.query('SELECT * FROM recipes WHERE lower(recipetitle) LIKE lower($1) OR lower(ingredients) ' +
            'LIKE lower($1)', ['%'+input+'%'])
    },
    recentRecipes(){
        console.log("Inside recentRecipes function in store");
        //made use of the recipeId instead of actual time_stamp
        return pool.query('SELECT * FROM recipes ORDER BY recipeid DESC LIMIT 8');
    },

    mealTypeRecipes(input){
        console.log("Inside browseRecipe in store");
            return pool.query('SELECT * FROM recipes WHERE mealtype=$1', [input]);
    }
};