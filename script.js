// importing the mongoose
const mongoose = require("mongoose");
const User= require("./User");

// connecting to the db
mongoose.connect("mongodb://localhost:27017");

// to check if the connection is successfull or not
const db = mongoose.connection;

// runs if the connection is suceesful
db.on("open", () => {
    console.log("Connection successful");
});

// runs if connection is not successful
db.on("error", () => {
    console.log("Connection not successful");
});

// create a new user
const newUser = new User({
    name: "Rohini",
    age: 25,
    isAdult: true,
    hobbies: ["teaching"],
});

// Add the user to db -> returns a promise
newUser.save().then((data) => {
    console.log(data);
});