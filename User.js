const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    isAdult: Boolean,
    hobbies: Array,
});

module.exports =  mongoose.model("User", userSchema)