const scheduleDAO = require('../models/plannerModel');
const userDao = require('../models/profilesModel.js');
const db = new scheduleDAO();
db.init();


exports.entries_list = function (req, res) {
    db.getAllEntries();
}

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;

    if (!user || !password) {
        res.status(401).send('Error: Please fill in the required fields');
        return;
    }

    userDao.lookup(user, function (err, u) {
        if (u) {
            res.status(401).send("The username already exists. Please use a different username!");
            return;
        }
        userDao.create(user, password);
        res.redirect('/');
    });


}

exports.show_user_entries = function (req, res) {

    let user = req.params.user;
    db.getEntriesByUser(user)
        .then((entries) => {
            res.render("entries", {
                "title": "🏋️Progress Tracking",
                'user': req.user,
                "entries": entries
            });
        })
        .catch((err) => {
            console.log('Error: Could not perceive any recorded workouts!')
            console.log(JSON.stringify(err))
        });
}

exports.deleteEntry = function (req, res) {
    db.deleteEntry(id = req.params.id)
    res.redirect('/')
}

exports.editEntry = function (req, res) {
    db.editEntry(id = req.params.id)
    res.redirect('/')
}

exports.landing_page = function (req, res) {

    db.getAllEntries().then((list) => {
        res.render('entries', {
            'title': '🏋️Progress Tracking',
            'entries': list,
            "user": req.user
        });
    }).catch((err) => {
        console.log('Promise rejected', err);
    })
}

exports.post_new_entry = function (req, res) {
    if (!req.body.status && (!req.body.goals || req.body.achievements)) {
        res.status(400).send("Error when submitting: Please fill in all the required fields!");
        return;
    }
    db.addEntry(req.body.user, req.body.workout_title, req.body.goals, req.body.achievements, req.body.date, req.body.status);
    res.redirect('/');
}

exports.show_register_page = function (req, res) {
    res.render("register", {
        "title": '🏋️Progress Tracking'
    });
}

exports.show_login_page = function (req, res) {
    res.render('login', {
        'title': '🏋️Progress Tracking'
    })
}

exports.show_new_entries = function (req, res) {
    res.render('newEntry', {
        'title': '🏋️Progress Tracking',
        'user': req.user.user
    })
}

exports.post_login = function (req, res) {
    res.redirect('/');
}

exports.logout = function (req, res) {
    req.logout();
    res.redirect("/");
}

exports.shareEntry = function (req, res) {

    db.getEntriesByID(id = req.params.id).then((list) => {
        res.render('entries', {
            'title': '🏋️Progress Tracking',
            'entries': list,
            "user": req.user,
            'shareDisplay': "🔗 You can share this workout by using the unique URL address at the top of this webpage"
        });
    }).catch((err) => {
        console.log('Promise rejected', err);
    })
}

exports.editEntry = function (req, res) {

    db.getEntriesByID(id = req.params.id).then((list) => {
        res.render('entries', {
            'title': '🏋️Progress Tracking',
            'entries': list,
            "user": req.user,
        });
    }).catch((err) => {
        console.log('Promise rejected', err);
    })
}


exports.server_error = function (err, req, res, next) {
    res.status(500);
    res.type('text/plain');
    res.send('Error 500: Internal Server Error!');
}

exports.not_found = function (err, req, res, next) {
    res.status(404);
    res.type('text/plain');
    res.send('Error 404: Page not found!');
}