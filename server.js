const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const uuid = uuidv4();
const crypto = require('crypto');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')({
    secret:'omega', resave: false, saveUninitialized: false
});
const db = require('./db');
const pool = db.pool;

//========= Firebase ==============

const firebase = require("firebase/app");
const admin = require("firebase-admin");
const  serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const Multer = require('multer');

const firebaseConfig = {
    apiKey: "AIzaSyBEAWyF3k4xv40Lk9pj4cgT_2QGHkANNoY",
    authDomain: "recipeshare-c27e5.firebaseapp.com",
    databaseURL: "https://recipeshare-c27e5.firebaseio.com",
    projectId: "recipeshare-c27e5",
    storageBucket: "recipeshare-c27e5.appspot.com",
    messagingSenderId: "710536044188",
    appId: "1:710536044188:web:a523e3f4771b9ba3"

};

admin.initializeApp(firebaseConfig);

const bucket = admin.storage().bucket();

const multer = Multer({
    storage: Multer.memoryStorage()
    // limits: {
    //     fileSize: 5 * 960 * 960
    // }
});

//=============================
const register = require('./routes/register');
const search = require('./routes/search');
const recipepage = require('./routes/recipepage');
const favorites = require('./routes/favorites');

app.use(session);
//initialize returns a middle which must be called at the start of connect/express based apps
app.use(passport.initialize());

//if app is uses persistent login sessions, passport.session must be used. Returns middleware that reads a user out
//of session if one is there, it will store the user in req.user
app.use(passport.session());
app.use(bodyParser.json());


app.get('/users', db.getUsers);

app.get('/authenticate', function(req, res, next){
    console.log("what is authenticate? " + req.user);
    // console.log(req);
    // console.log(req.user['rows'][0].username);
// , username: req.user['rows'][0].username
//     if(req.user){
        res.json(req.isAuthenticated());
    // }
});

app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }
        console.log("what is user?");
        // console.log(user);
        if(user != false){
            req.logIn(user, function(err){
                if(err){
                    return next(err);
                }
                console.log("alright we are in login post, lets see what this is");
                // console.log(req.user.rows[0].username);
                // console.log(req.user.rows[0]);
                // console.log(req.user.rows[0].accountid);
                res.json({url: "/" , username: req.user.rows[0].username, userID: req.user.rows[0].accountid});
            });
        }else{
            console.log("User doesnt exist?");
            res.status(401).json({message: "The username or password given is incorrect"});
            // res.status(401).send("User entered does not exist");
        }
        console.log("does this still run even when user does not exist?");
        //req.logIn generates a session for a user
        // req.logIn(user, function(err){
        //     if(err){
        //         return next(err);
        //     }
        //     // currentUser = user.username;
        //     // console.log("alright we are in login post, lets see what this is");
        //     // console.log(req.user.rows[0].username);
        //     res.json({url: "/" , username: req.user.rows[0].username });
        // })
    })(req, res, next);
});

app.get('/logout', function(req, res, next){
    console.log("do we go to server logout?");
    req.session.destroy();
    req.logout();
    res.redirect('/');
});

app.post('/createRecipe', multer.single('file'),checkAuthentication, function(req, res, next){
    console.log("within createRecipe serverSide");
    // console.log(req.body);
    // console.log(bucket.name);
    let formBody = req.body;
    let file = req.file;
    let token = uuid;
    let nameHash = crypto.randomBytes(20).toString('hex');
    let bucketFile = bucket.file(nameHash);
    console.log(token);

    bucketFile
        .save(Buffer.from(file.buffer), {metadata: { metadata: {firebaseStorageDownloadTokens: token}}})
        .then(()=>{
            console.log("inside bucketFile...");
            //IN regards to UUID the first submit takes the longest and the others are quick this is because UUID is not generating different tokens!!!!!!
            // console.log(bucketFile.metadata.metadata.firebaseStorageDownloadTokens);
            res.status(200).json({
                status: 'success',
                data: Object.assign({}, bucketFile.metadata
                )
            })
        })
        .then(()=>{
            console.log("whats metadata?");

            let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'+bucketFile.metadata.bucket+'/o/'
                +encodeURIComponent(bucketFile.metadata.name)+'?alt=media&token='+
                bucketFile.metadata.metadata.firebaseStorageDownloadTokens;

            storeForm(formBody, imageUrl)
                .then(response=>{
                    console.log("adding form data was successful");
                    // console.log(response);

                    //res was sent already in the first .then so you are now getting an error when trying to send another
                    // res.status(200).json({status: 'upload to database was successful'});
                })
                .catch(error=>{
                    console.log("adding form data was not successful");
                    console.log(error);
                    res.status(500).json({
                        status:'error',
                        errors: error,
                    })
                })
        })
        .catch(err=>{
            console.log("error in bucketFile...");
            console.log(err);
            res.status(500).json({
                status:'error',
                errors: err,
            })
        })
});

//!!!!!!!*****

app.use('/', register);
app.use('/', search);
app.use('/', recipepage);
app.use('/', favorites);


app.listen(process.env.LOCAL_PORT || 8100, ()=> {
    console.log("Server running on http://localhost:8100/'")
});

//======= PassportJS ===========

//configure a strategy with passport.use
passport.use(new LocalStrategy(
    function(username, password, done){
        console.log("Within passport.use(localstrat).... what is username? " + username);
        console.log(password);
        pool.query('SELECT * FROM accounts WHERE username= $1', [username], (error, user)=>{
            if(error){
                return done(error);
            }
            if(!user){
                return done(null, false);
            }
            //authenticate user entered username and password
            db.authenticate({username: username, password: password})
                .then(function(response){
                    console.log("do we make it into db.authenticate??");
                    console.log(response);
                    if(!response){
                        //cannot find the user or the password does not match
                        return done(null, false);
                    }else{
                        //found user and password matches
                        return done(null, user);
                    }
                })
        })
    }
));

//When authentication succeeds, session is established and manintaed via a cookie in user's browser
//each subsequent request will not contain credentials but instead use this cookie to identify the session.
//Passport will serialize and deserialize user instances to and from the session, here only the userID is serialized
// to the session.
passport.serializeUser(function(user, done){
    console.log("is serialize being called?");
    console.log(user.rows[0].username);
    done(null, user.rows[0].username);
});

//DeserializeUser will be invoked every subsequent request to deserialize the instance, providing it
// the unique cookie identifier as credential
passport.deserializeUser(function(username, done){
    console.log("is deserialize being called?");
    pool.query('SELECT * FROM accounts WHERE username=$1', [username],  function(err, user){
        if(err){
            return done(err);
        }else{
            done(null, user);
        }
    })
});

//===============================
function storeForm(form, url){
    console.log("Do we get to see what form is?");
    // console.log(form);
    // console.log(form.Creator);
    //have to add in 'creator' as in the user who is creating the recipe into the insert of this pool.query later
    return pool.query('INSERT INTO recipes(creator, username, preptime, cooktime, servings, mealtype, recipetitle, ' +
        'description, ingredients, directions, image, creationtime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, ' +
        '$11, current_timestamp)', [form.Creator, form.Username, form.PrepTime, form.CookTime, form.Servings,
        form.MealType, form.RecipeTitle, form.RecipeDescription, form.RecipeIngredients, form.RecipeDirections, url]
    );
}

function checkAuthentication(req, res, next){
    console.log("CHECKING AUTHENTICATION");
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/loginpage");
    }
}
