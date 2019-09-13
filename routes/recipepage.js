const express = require('express');
const router = express.Router();
const store = require('../store/recipepage');

router.get('/getRecipe/:recipeid', function(req, res){
    console.log("Inside getRecipe router.post");
    // console.log(req.body);
    // console.log(req.params);
    store.getRecipe(req.params.recipeid)
        .then(function(response){
            console.log("response from store.getRecipe");
            // console.log(response);
            res.status(200).json(response);
        }).catch(function(err){
            console.log("error with store.getRecipe");
            console.log(err);
            res.sendStatus(404);
        })

});

module.exports = router;