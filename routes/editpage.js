// const express = require('express');
// const router = express.Router();
// const store = require('../store/editpage');
// const Multer = require('multer');
// const crypto = require('crypto');
//
// const multer = Multer({
//    storage: Multer.memoryStorage()
// });
//
// router.put('/editPage', multer.single('file'), function(req, res){
//    console.log("Inside /editRecipe router.put");
//    console.log(req.body);
//    if(req.file !== null){
//
//    }
//    store.editPage(req.body)
//        .then(function(response){
//           console.log("response from store.editPage");
//           console.log(response);
//           res.status(200).json(response);
//        }).catch(function(err){
//           console.log("error with store.editPage");
//           console.log(err);
//           res.sendStatus(404);
//    })
// });
//
// module.exports = router;