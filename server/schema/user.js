const mongoose = require("mongoose");
//Database model for a user
const userSchema = new mongoose.Schema({
    user: {
        type: String,
        
        default:""
    },
    pass: {
        type: String,
        
        default: ""
    }
    
});
const User = mongoose.model("User", userSchema);
module.exports = User;