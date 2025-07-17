import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    isAdult: Boolean,
    hobbies: Array,
});

const user =  mongoose.model("User", userSchema);

export default user;