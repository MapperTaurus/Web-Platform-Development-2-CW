const express = require('express');
const router = require('./routes/plannerRoutes');
const path = require('path');
const mustache = require('mustache-express');
const auth = require('./auth/auth');
const session = require('express-session');
const passport = require('passport');

const app = express();

const pages = path.join(__dirname, 'pages');
app.use(express.static('pages'));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.urlencoded({ extended: false }));

app.use(session({ secret: 'generic-secret41239118', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

auth.init();

app.use('/', router);

app.listen(3000, () => {
    console.log('Server started on port 3000.');
    console.log('Author: Ivan Todorov');
});

