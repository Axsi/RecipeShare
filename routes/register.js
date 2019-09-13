const express = require('express');
const router = express.Router();
const store = require('../store/register');

router.post('/registerAccount', function(req, res){
    console.log("Inside router.post");
    console.log(req.body);
    store.checkAccount({
        username: req.body.username
    }).then(function(response){
        // if(error){
        //     console.log(error);
        // }
        console.log("check user in checkAccount");
        console.log(response);
        if(!response.rowCount){
            // let alreadyExist = {message: "This username is already in use"};
            // console.log(alreadyExist);
            // return alreadyExist;
            store.registerAccount({
                username: req.body.username,
                password: req.body.password
            }).then(function() {
                console.log("BLIZZARD");
                res.status(200).json({url: "/loginpage"});
                // res.json({url: "/loginpage"});
                // res.sendStatus(200);
            }).catch(function(err){
                console.log("KAKAO");
                console.log(err);
                console.log('to infinity and beyond');
                res.sendStatus(400);
            });
        }else{
            // let alreadyExist = {message: "This username is already in use"};
            // console.log(alreadyExist);
            console.log("we be sending back that already exist message");
            res.json({message: "This username is already in use"})
        }
    }).catch(function(err){
            console.log("store.checkAccount catch");
            console.log(err);
        });

    // store.registerAccount({
    //     username: req.body.username,
    //     password: req.body.password
    // }).then(function(res) {
    //     console.log("BLIZZARD");
    //     console.log(res);
    //     res.json({url: "/loginpage", message: res});
    //     res.sendStatus(200);
    // }).catch(function(err){
    //     console.log("KAKAO");
    //     console.log(err);
    //     console.log('to infinity and beyond');
    //     res.sendStatus(400);
    // });
});

//mount router module on a path in the main app
module.exports = router;

// res.json({url: "/" , username: req.user.rows[0].username });

