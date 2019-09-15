// const db = require('../db');
// const pool = db.pool;
//
// module.exports = {
//   editPage(formData){
//       console.log("Inside editRecipe in store");
//       console.log(formData);
//       console.log(formData.file);
//       if(formData.file === null){
//           return pool.query('UPDATE recipes SET preptime=$1, cooktime=$2, servings=$3, mealtype=$4, recipetitle=$5, ' +
//               'description=$6, ingredients=$7, directions=$8 WHERE recipeid=$9',
//               [
//                   formData.PrepTime,
//                   formData.CookTime,
//                   formData.Servings,
//                   formData.MealType,
//                   formData.RecipeTitle,
//                   formData.RecipeDescription,
//                   formData.RecipeIngredients,
//                   formData.RecipeDirections,
//                   formData.RecipeID
//               ])
//       }else{
//           return pool.query('UPDATE recipes SET image=$1 preptime=$2, cooktime=$3, servings=$4, mealtype=$5, ' +
//               'recipetitle=$6, description=$7, ingredients=$8, directions=$9 WHERE recipeid=$10',
//               [
//                   formData.file,
//                   formData.PrepTime,
//                   formData.CookTime,
//                   formData.Servings,
//                   formData.MealType,
//                   formData.RecipeTitle,
//                   formData.RecipeDescription,
//                   formData.RecipeIngredients,
//                   formData.RecipeDirections,
//                   formData.RecipeID
//               ])
//       }
//   }
//
// };