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
const  serviceAccount = require('D:/Projects/RecipeShare/service-account-file.json');
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
});

//=============================
const register = require('./routes/register');
const search = require('./routes/search');
const recipepage = require('./routes/recipepage');
const favorites = require('./routes/favorites');
const creations = require('./routes/createdpage');

app.use(session);
//initialize returns a middle which must be called at the start of connect/express based apps
app.use(passport.initialize());

//if app is uses persistent login sessions, passport.session must be used. Returns middleware that reads a user out
//of session if one is there, it will store the user in req.user
app.use(passport.session());
app.use(bodyParser.json());


app.get('/users', db.getUsers);

app.get('/authenticate', function(req, res, next){
    res.json(req.isAuthenticated());
    // res.json({authenticated: req.isAuthenticated()});
});

app.post('/login', function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }
        if(user != false){
            req.logIn(user, function(err){
                if(err){
                    return next(err);
                }
                //set userID in experss-session cookie here
                // req.session['userid'] = req.user.rows[0].accountid;
                // req.session['username'] = req.user.rows[0].username;
                res.json({url: "/" , username: req.user.rows[0].username, userID: req.user.rows[0].accountid});
            });
        }else{
            res.status(401).json({message: "The username or password given is incorrect"});
        }
    })(req, res, next);
});

app.get('/logout', function(req, res, next){
    req.session.destroy();
    req.logout();
    res.redirect('/');
});

app.post('/createRecipe', multer.single('file'),checkAuthentication, function(req, res, next){
    let formBody = req.body;
    let file = req.file;

    let token = uuid;
    let nameHash = crypto.randomBytes(20).toString('hex');
    let bucketFile = bucket.file(nameHash);
    bucketFile
        .save(Buffer.from(file.buffer), {metadata: { metadata: {firebaseStorageDownloadTokens: token}}})
        .then(()=>{
            res.status(200).json({
                status: 'success',
                data: Object.assign({}, bucketFile.metadata
                )
            })
        })
        .then(()=>{
            let imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'+bucketFile.metadata.bucket+'/o/'
                +encodeURIComponent(bucketFile.metadata.name)+'?alt=media&token='+
                bucketFile.metadata.metadata.firebaseStorageDownloadTokens;

            storeForm(formBody, imageUrl)
                .then(response=>{
                    // console.log("adding form data was successful");
                    // console.log(response);

                    //res was sent already in the first .then so you are now getting an error when trying to send another
                    // res.status(200).json({status: 'upload to database was successful'});
                }).catch(error=>{
                console.log(error);
                res.status(500).json({
                    status:'error',
                    errors: error,
                })
            })
        }).catch(err=>{
        console.log(err);
        res.status(500).json({
            status:'error',
            errors: err,
        })
    })
});

app.put('/editPage', multer.single('file'), function(req, res){
    let formBody = req.body;
    let imageUrl = '';
    if(req.file !== undefined){
        let file = req.file;

        let token = uuid;
        let nameHash = crypto.randomBytes(20).toString('hex');
        let bucketFile = bucket.file(nameHash);

        bucketFile
            .save(Buffer.from(file.buffer), {metadata: { metadata: {firebaseStorageDownloadTokens: token}}})
            // .then(()=>{
            //     console.log("inside bucketFile...");
            // })
            .then(()=>{
                imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'+bucketFile.metadata.bucket+'/o/'
                    +encodeURIComponent(bucketFile.metadata.name)+'?alt=media&token='+
                    bucketFile.metadata.metadata.firebaseStorageDownloadTokens;
                storeEditPage(formBody, imageUrl)
                    .then(function(response){
                        res.status(200).json({
                            status: 'success',
                            data: Object.assign({}, bucketFile.metadata
                            ),
                            recipeid: formBody.RecipeID
                        })
                    }).catch(function(err){
                    console.log(err);
                    res.sendStatus(404);
                })
            }).catch(err=>{
            console.log(err);
            res.status(500).json({
                status:'error',
                errors: err,
            })
        })
    }else{
        storeEditPage(formBody, imageUrl)
            .then(function(response){
                res.status(200).json({
                    status: 'success',
                    recipeid: formBody.RecipeID
                })
                // response.status(200).json(response);
            }).catch(function(err){
            console.log(err);
            res.sendStatus(404);
        })
    }
});

app.use('/', register);
app.use('/', search);
app.use('/', recipepage);
app.use('/', favorites);
app.use('/', creations);

app.listen(process.env.LOCAL_PORT || 8100, ()=> {
    console.log("Server running on http://localhost:8100/'")
});

//======= PassportJS ===========

//configure a strategy with passport.use
passport.use(new LocalStrategy(
    function(username, password, done){
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
    done(null, user.rows[0].username);
});

//DeserializeUser will be invoked every subsequent request to deserialize the instance, providing it
// the unique cookie identifier as credential
passport.deserializeUser(function(username, done){
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
    return pool.query('INSERT INTO recipes(creator, username, preptime, cooktime, servings, mealtype, recipetitle, ' +
        'description, ingredients, directions, image, creationtime) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, ' +
        '$11, current_timestamp)', [form.Creator, form.Username, form.PrepTime, form.CookTime, form.Servings,
        form.MealType, form.RecipeTitle, form.RecipeDescription, form.RecipeIngredients, form.RecipeDirections, url]
    );
}

function storeEditPage(formData, url){
    if(url === ''){
        return pool.query('UPDATE recipes SET preptime=$1, cooktime=$2, servings=$3, mealtype=$4, recipetitle=$5, ' +
            'description=$6, ingredients=$7, directions=$8 WHERE recipeid=$9',
            [
                formData.PrepTime,
                formData.CookTime,
                formData.Servings,
                formData.MealType,
                formData.RecipeTitle,
                formData.RecipeDescription,
                formData.RecipeIngredients,
                formData.RecipeDirections,
                formData.RecipeID
            ])
    }else{
        return pool.query('UPDATE recipes SET image=$1, preptime=$2, cooktime=$3, servings=$4, mealtype=$5, ' +
            'recipetitle=$6, description=$7, ingredients=$8, directions=$9 WHERE recipeid=$10',
            [
                url,
                formData.PrepTime,
                formData.CookTime,
                formData.Servings,
                formData.MealType,
                formData.RecipeTitle,
                formData.RecipeDescription,
                formData.RecipeIngredients,
                formData.RecipeDirections,
                formData.RecipeID
            ])
    }
}
function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect("/loginpage");
    }
}
