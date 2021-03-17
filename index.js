const express = require('express');
const router = require('./routes/plannerRoutes.js');
const app = express();
const mustache = require ('mustache-express');

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use('/', router);

app.listen(3000, () => {
   console.log('Server started on port 3000.');
   console.log('Author: Ivan Todorov');
});



