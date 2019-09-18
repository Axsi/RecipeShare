const express = require('express');
const router = express.Router();
const store = require('../store/createdpage');

router.get('/getCreations/:userID', function(req, res){
    let input = req.params.userID;
   store.getCreations(input)
       .then(function(response){
           res.status(200).json(response);
       }).catch(function(err){
           console.log(err);
           res.sendStatus(404);
   })
});

module.exports = router;