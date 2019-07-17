const env = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')({
    secret:'omega', resave: false, saveUninitialized: false
});


app.use(bodyParser.json());
app.use(session);

app.listen(8100, ()=> {
    console.log("Server running on http://localhost:8100/'")
});
