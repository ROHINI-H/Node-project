import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        immutable: true,
    },
    isAdult: {
        type: Boolean,
        default: true,
    },
    hobbies: Array,
});

const user =  mongoose.model("User", userSchema);

export default user;