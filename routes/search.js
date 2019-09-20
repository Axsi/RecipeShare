const express = require('express');
const router = express.Router();
const store = require('../store/search');

router.post('/search', function(req, res){
    let input = req.body.searchInput;
    store.searchRecipe(input)
        .then(function(response){
            res.status(200).json(response);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
        })
});

router.get('/recentRecipes', function(req, res){
    store.recentRecipes()
        .then(function(response){
            if(response === undefined){
                res.status(200).json({});
            }else{
                res.status(200).json(response);
            }
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
        })
});

router.get('/mealType/:selection', function(req, res){
    let input = req.params.selection;
    store.mealTypeRecipes(input)
        .then(function (response){
            res.status(200).json(response);
        }).catch(function (err){
            console.log(err);
            res.sendStatus(404);
        })
});
module.exports = router;