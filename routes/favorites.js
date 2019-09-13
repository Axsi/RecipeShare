const express = require('express');
const router = express.Router();
const store = require('../store/favorites');

router.post('/addFavorite', function(req,res){
   console.log("Inside /addFavorite router.post");
   console.log(req.body);
   let input = req.body;
   store.addFavorite(input)
       .then(function(response){
           console.log("Response from store.addFavorite");
           console.log(response);
           res.status(200).json(response);
       }).catch(function(err){
           console.log("Error at /addFavorite in route.post");
           console.log(err);
           res.sendStatus(404);
       })
});

module.exports = router;