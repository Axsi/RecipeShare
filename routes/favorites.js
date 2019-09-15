const express = require('express');
const router = express.Router();
const store = require('../store/favorites');

router.post('/addFavorite', function(req,res){
   console.log("Inside /addFavorite router.post");
   console.log(req.body);
   let input = req.body;
   store.checkFavorites(input)
       .then(function(response){
           console.log("Response from store.checkFavorites");
           // console.log(response);
           if(!response.rowCount){
               console.log("added favorite with no problem");
               store.addFavorite(input)
                   .then(function(response){
                       console.log("Response from store.addFavorite");
                       // console.log(response);
                       res.status(200).json(response);
                   }).catch(function(err){
                   console.log("Error at /addFavorite in route.post");
                   console.log(err);
                   res.sendStatus(404);
               })
           }else{
               console.log("user has already added this recipe to favorites");
           }
       }).catch(function(err){
           console.log("Error at store.checkFavorites");
           console.log(err);
   })
});

router.get('/getFavorites/:userID', function(req, res){
    console.log("Inside /getFavorites router.get");
    // console.log(req.params);
    let input = req.params.userID;
    // console.log(input);
    store.getFavorites(input)
        .then(function(response){
            console.log("Response from store.getFavorites");
            console.log(response);
            res.status(200).json(response);
        }).catch(function(err){
            console.log("Error at /getFavorite in route.get");
            console.log(err);
            res.sendStatus(404);
    })
});

module.exports = router;