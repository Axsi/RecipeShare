const express = require('express');
const router = express.Router();
const store = require('../store/recipepage');

router.get('/getRecipe/:recipeid', function(req, res){
    store.getRecipe(req.params.recipeid)
        .then(function(response){
            res.status(200).json(response);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
        })

});

router.delete('/deleteRecipe', function(req, res){

});
module.exports = router;