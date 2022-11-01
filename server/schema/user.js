import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String
    //not sure what else should be associated with a user for now
});
const User = mongoose.model("User", userSchema);