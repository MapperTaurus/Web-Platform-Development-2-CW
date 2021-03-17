const express = require('express');
const router = express.Router();
const path = require('path');
const pages = path.join(__dirname, `pages`);
const controller = require ('../controllers/plannerControllers');

router.use(express.static(pages));

router.get("/", controller.landing_page);

router.get("/index", function(req, res) {
    res.send('<h1>Testing something </h1>');
})

router.get("/plan", function(req, res) {
    res.sendFile(path.join(pages, '/plan.html'));
})

router.get("/achievements", controller.achievements_page);

router.get("/about", function(req, res) {
    res.sendFile(path.join(pages, '/about.html'));
})

router.use(function(req, res) {
    res.status(400);
    res.type('text/plan');
    res.send('Error:404 Page Not Found!');   
 })

router.use(function(err, req, res, next ) {
    res.status(500);
    res.type('text/plan');
    res.send('Error:500 Internal Server Error!');  
 }) 

module.exports = router;