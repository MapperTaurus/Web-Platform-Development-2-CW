const plannerDAO = require('../models/plannerModel');
const db = new plannerDAO();
const controller = require ('../controllers/plannerControllers');


exports.vincents_entries = function(req, res) {
    res.send('<h1>Processing Vincent\'s Entries, see terminal</h1>');
}

exports.landing_page = function(req, res) {
    res.send('<h1>Welcome to Progress Tracking</h1> <br/> <h2>Homepage</h2>');
   // db.init();
}

exports.post_new_entry = function(req, res) {
    //console.log('processing post-new_entry controller');
    if (!req.body.subject || !req.body.contents) {
        res.status(400).send("Entries must have a title and content.");
        return;
    }
    db.addEntry(req.body.author, req.body.subject, req.body.contents);
    res.redirect('/');
}

exports.achievements_page = function(req, res) {
    //db.init();
    db.getAllEntries().then((list)=>{
        res.render('entries', {
            'title': 'Training Schedule 📅',
            'entries': list 
        });
        console.log('Promise Resolved');
    }).catch((err) => {
        console.log('Could NOT resolve the promise', err);
    })
}
