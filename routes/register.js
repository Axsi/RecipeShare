const express = require('express');
const router = express.Router();
const store = require('../store/register');

router.post('/registerAccount', function(req, res){
    store.checkAccount({
        username: req.body.username
    }).then(function(response){
        if(!response.rowCount){
            store.registerAccount({
                username: req.body.username,
                password: req.body.password
            }).then(function() {
                res.status(200).json({url: "/loginpage"});
            }).catch(function(err){
                console.log(err);
                res.sendStatus(400);
            });
        }else{
            res.json({message: "This username is already in use"})
        }
    }).catch(function(err){
            console.log(err);
        });
});

//mount router module on a path in the main app
module.exports = router;


