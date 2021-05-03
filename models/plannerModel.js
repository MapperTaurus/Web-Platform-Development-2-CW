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
    init() {
        this.db.insert({
            workout_title: 'I liked the exhibition',
            contents: 'nice',
            date: '03.05.2021',
            published: '2020-04-16',
            user: 'Martin'
        });

        this.db.insert({
            workout_title: "Didn't like it",
            contents: 'A really terrible style!',
            date: '08.05.2021',
            published: '2021-04-18',
            user: 'Ann'
        });
    }

    //return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data, 
            //with error first callback function, err for error, entries for data
            this.db.find({}, function(err, entries) {
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

    addEntry(user, workout_title, contents, date) {

        var entry = {
            user: user,
            workout_title: workout_title,
            contents: contents,
            date: date,
            published: new Date().toISOString().split('T')[0]
        }

        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', workout_title);
            }
        })

    }


    getEntriesByUser(userName) {
        return new Promise((resolve, reject) => {
            this.db.find({ 'user': userName }, function(err, entries) {
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
            this.db.find({ 'user': id }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                }
            });
        })
    }

    deleteEntry(workout_title) {
        this.db.remove({_workout_title: workout_title}, {}, function(err, rem) {
            if (err) {
            console.log("error in deleteEntry", err);
            } else {
            console.log("rem, ’ entries deleted");
            }
            })
            } 

}

module.exports = Schedule;