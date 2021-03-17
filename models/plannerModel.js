const Datastore = require('nedb');
const nedb = require('nedb');
const db = new nedb({filename: 'schedule.db', autoload: true});

class Planner {

    constructor (dbFilePath) {
        if(dbFilePath) {
            // Embedded Database (if the argument is present)
            this.db = new Datastore({filename:dbFilePath, autoload: true});
        } else {
            //  In-memory Database (if there is NOT any argument)
            this.db = new Datastore();
        }
    }

    init() {
        this.db.insert({
            achievementName: 'Golden Plank',
            achievementDescription: 'Hold a three-minute plank',
            achieved: '2021-03-11',
            user: 'Vincent'
        });
        this.db.insert({
            achievementName: 'Silver Plank',
            achievementDescription: 'Hold a two-minute plank',
            achieved: '2021-03-09',
            user: 'Emily'
        });
        this.db.insert({
            achievementName: 'Bronze Plank',
            achievementDescription: 'Hold a minute plank',
            achieved: '2021-03-08',
            user: 'Francis'
        });
        this.db.insert({
            achievementName: 'Silver Butterfly Stretch',
            achievementDescription: 'Stay in Seated Butterfly Stretch for three minutes',
            achieved: '2021-03-06',
            user: 'Vincent'
        });
        this.db.insert({
            achievementName: 'Bronze Plank',
            achievementDescription: 'Hold a minute plank',
            achieved: '2021-03-02',
            user: 'Emily'
        });
        this.db.insert({
            achievementName: 'Golden Butterfly Stretch',
            achievementDescription: 'Stay in Seated Butterfly Stretch for ten minutes',
            achieved: '2021-03-02',
            user: 'Francis'
        });
        this.db.insert({
            achievementName: 'Bronze Butterfly Stretch',
            achievementDescription: 'Stay in Seated Butterfly Stretch for a minute',
            achieved: '2021-03-02',
            user: 'Emily'
        });
        console.log('Database entries inserted!');

        // Remove the "Golden Plank" Achievement
        /*
        this.db.remove({ achievementName: 'Golden Plank'}, function(err, numDocs) {
            if (err) {
                console.log('Database Error: Could NOT delete the entry!', err);
            }
            else {
                console.log(numDocs, 'Entries deleted');
            }
        }) 
        */

        // Find all achievements for user Vincent
        /*
          this.db.find({ user: 'Vincent'}, function(err, docs) {
            if (err) {
               console.log('Database Error: Could NOT retrieve any entries!', err);
            } else {
               console.log ('Entries retrieved for user Vincent:');
               console.log(docs);
            }
         })
         */
         
         
    }
    
    // Display all achievements (both in terminal and achievements page)
    getAllEntries() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if (err) {
                    reject(err);
                    console.log('Database Error: Could NOT retrieve any entries!', err);
                } else {
                    resolve(entries);
                    console.log('Displaying all entries:', entries);
                }
            })
        })
    } 
}

module.exports = Planner;
