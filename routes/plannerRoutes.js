const express = require('express');
const router = express.Router();
const path = require('path');
const pages = path.join(__dirname, `pages`);
const auth = require('../auth/auth');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const controller = require ('../controllers/plannerControllers');


router.use(express.static(pages));

router.get('/', controller.landing_page);

router.get('/shedule', controller.entries_list);

router.get('/new', ensureLoggedIn('/login'), controller.show_new_entries);

router.post('/new', ensureLoggedIn('/login'), controller.post_new_entry);

router.get('/posts/:user', controller.show_user_entries);

router.get("/about", function(req, res) {
    res.sendFile(path.join(pages, '/about.html'));
})

router.get('/login', controller.show_login_page);

router.post('/login', auth.userize('/login'), controller.post_login);

router.get('/register', controller.show_register_page);

router.post('/register', controller.post_new_user);

router.get('/logout', controller.logout);

router.get('/delete/:id', controller.deleteEntry); 


router.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not found.');
})
/*
router.use(function(err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Internal Server Error.');
})
*/
module.exports = router;