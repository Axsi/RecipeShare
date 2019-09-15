const express = require('express');
const router = express.Router();
const store = require('../store/createdpage');

router.get('/getCreations/:userID', function(req, res){
    console.log("Inside /getCreations/ router.get");
    let input = req.params.userID;
   store.getCreations(input)
       .then(function(response){
           console.log("response from store.getCreations");
           console.log(response);
           res.status(200).json(response);
       }).catch(function(err){
           console.log("error with store.getCreations");
           console.log(err);
           res.sendStatus(404);
   })
});

module.exports = router;