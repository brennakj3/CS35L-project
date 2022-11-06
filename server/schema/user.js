const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
    //not sure what else should be associated with a user for now
});
const User = mongoose.model("User", userSchema);
module.exports = User;