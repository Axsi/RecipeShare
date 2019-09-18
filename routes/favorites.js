const express = require('express');
const router = express.Router();
const store = require('../store/favorites');

router.post('/addFavorite', function(req,res){
   let input = req.body;
   store.checkFavorites(input)
       .then(function(response){
           if(!response.rowCount){
               store.addFavorite(input)
                   .then(function(response){
                       res.status(200).json(response);
                   }).catch(function(err){
                   console.log(err);
                   res.sendStatus(404);
               })
           }
       }).catch(function(err){
           console.log(err);
   })
});

router.get('/getFavorites/:userID', function(req, res){
    let input = req.params.userID;
    store.getFavorites(input)
        .then(function(response){
            res.status(200).json(response);
        }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
    })
});

module.exports = router;