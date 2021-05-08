const Datastore = require('nedb');

class Schedule {

    //call the constructor with the db name for embedded use and without it for in-memory use
    constructor(dbFilePath) {
        if (dbFilePath) {
            //embedded
            this.db = new Datastore({ filename: dbFilePath, autoload: true });
        } else {
            //in memory 
            this.db = new Datastore();
        }
    }

    //insert initial entries in the databse
    //DISCLAIMER: training goals and achievements are private for each profile, these 3 entries are used just as an example!!!
    init() {
        this.db.insert({
            workout_title: 'Chest and back',
            goals: 'Judo push-up x5, Cable Pulldowns x10, Barbell Incline Press x15, Barbell Bent Over Row x15, Push Ups x20, Hip Thrust x10 ',
            achievements: 'Judo push-up x2, Cable Pulldowns x5, Barbell Incline Press x10, Barbell Bent Over Row x12, Push Ups x18, Hip Thrust x10',
            date: '2021-05-02',
            status: '✅Completed',
            published: '2021-04-16',
            user: 'Martin'
        });

        this.db.insert({
            workout_title: "Arm and shoulder",
            goals: 'Bench press x10, Bent-over row x5, Lat pull-down x15, One-arm cable press x10, Incline dumbbell flye x20',
            achievements: 'Bench press x8, Bent-over row x5, Lat pull-down x11, One-arm cable press x10, Incline dumbbell flye x12',
            date: '2021-05-06',
            status: '⏰Scheduled',
            published: '2021-04-18',
            user: 'Vincent'
        });

        this.db.insert({
            workout_title: "Cardio",
            goals: 'High knees x20, Butt kicks x20, Lateral shuffles x15, Speed skaters x15, Jumping jacks x20, Toe taps x10, Squat jumps x25',
            achievements: 'High knees x25, Butt kicks x25, Lateral shuffles x10, Speed skaters x5, Jumping jacks x20, Toe taps x10, Squat jumps x20',
            date: '2021-05-16',
            status: '⏰Scheduled',
            published: '2021-04-24',
            user: 'Vincent'
        });
    }

    //return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data, 
            //with error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                }
            })
        })
    }

    addEntry(user, workout_title, goals, achievements, date, status) {

        var entry = {
            user: user,
            workout_title: workout_title,
            goals: goals,
            achievements: achievements,
            date: date,
            status: status,
            published: new Date().toISOString().split('T')[0]
        }

        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log('Error inserting document', workout_title);
            }
        })
    }

    getEntriesByUser(userName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'user': userName }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                }
            });
        })
    }

    getEntriesByID(id) {
        return new Promise((resolve, reject) => {
            this.db.find({ _id: id }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                }
            });
        })
    }

    deleteEntry(id) {
        this.db.remove({ _id: id }, {}, function (err, rem) {
            if (err) {
                console.log("Error: Could not delete the workout!", err);
            } else {
                console.log("Workout deleted!");
            }
        })
    }
}

module.exports = Schedule;