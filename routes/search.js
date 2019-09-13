const express = require('express');
const router = express.Router();
const store = require('../store/search');

router.post('/search', function(req, res){
    console.log("Inside search post router");
    console.log(req.params);
    let input = req.body.searchInput;

    console.log(input);
    store.searchRecipe(input)
        .then(function(response){
            console.log("response from store.recipeSearch");
            // console.log(response);
            res.status(200).json(response);
        }).catch(function(err){
            console.log("store searchRecipe catch");
            console.log(err);
            res.sendStatus(404);
        })
});

router.get('/recentRecipes', function(req, res){
    console.log("Inside recentRecipes get router");
    store.recentRecipes()
        .then(function(response){
            console.log("response from store.recentRecipes");
            // console.log(response);
            res.status(200).json(response);
        }).catch(function(err){
            console.log("Error in the response received from store.recentRecipes");
            console.log(err);
            res.sendStatus(404);
        })
});

router.get('/mealType/:selection', function(req, res){
    console.log("Inside browseRecipe get router");
    console.log(req.params);
    let input = req.params.selection;
    console.log(input);

    store.mealTypeRecipes(input)
        .then(function (response) {
            console.log("response from store.browseRecipe");
            console.log(response);
            res.status(200).json(response);
        }).catch(function (err) {
            console.log("Error in the response received from store.browseRecipe");
            console.log(err);
            res.sendStatus(404);
        })
    // if(input === "Beef" || "Chicken" || "Pork" || "Salmon"){
    //     store.searchRecipe(input)
    //         .then(function(response){
    //             console.log("response from store.recipeSearch");
    //             console.log(response);
    //             res.status(200).json(response);
    //         })
    //         .catch(function(err){
    //             console.log("store searchRecipe catch");
    //             console.log(err);
    //             res.sendStatus(404);
    //         })
    // }
});
module.exports = router;