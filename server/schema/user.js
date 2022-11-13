const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        
        default:""
    },
    pass: {
        type: String,
        
        default: ""
    }
    //not sure what else should be associated with a user for now
});
const User = mongoose.model("User", userSchema);
module.exports = User;