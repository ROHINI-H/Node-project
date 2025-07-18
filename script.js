import mongoose from "mongoose";
import User from "./User.js";

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

const user2 = await User.create({
    name: "Raji",
    age:18,
    isAdult: true,
    hobbies: ["Reading"],
});

user2.save().then((data) => {
    console.log(data);
});

// find all the user
const users = await User.find();
console.log(users);

// find particular user
console.log(await User.findOne({name:"Raji"}));

// Update any user
user2.name = "Reshma";

const youngUser = await user2.save();

console.log(youngUser);

// delete the user
const deletedUser = await User.deleteOne({name: "Rohini"});
console.log(deletedUser);

// delete all the users
await User.deleteMany({name: "Reshma"});

const user4 = await User.create({
    name: "ABC",
    age:12
});

await user4.save();