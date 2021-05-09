Web-based Activity Planner 
==================

Website, which allows the users to schedule, edit and share their own training routines. Using NeDB embedded database for user profiles and in-memory database for the scheduled workouts.
The application is developed in a MVC pattern. The model contains the entire logic of the program (classes and their associated functions), the controller acts as a bridge between the view (user interface) and the model.
The controller sorts each element of the logic with an identifier, this identifier is basically the name of the function used by the controller itself (e.g. exports.function_name).
This function is then called from within the routes file.

**Coursework for the module Web Platform Development 2 - M3I322955**

# Installation

Download the repository, install the required modules and run the application.

Required commands for installation:

```
npm install git-download --save
npm install express
npm install mustache-express
npm install passport
npm install nedb
```

# Start-up

After you have finished with the installation you can run the application with the following command:

```
node index.js
```

The website can be accessed at **http://localhost:3000/** by default.

# Author

Name: **Ivan Todorov** 

Student ID: **S1822426**

Student Email: **ITODOR200@caledonian.ac.uk**
