const mongoose = require("mongoose");
//Database Model for a Review
const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        
        default:""
    },
    body: {
        type: String,
        default:""
    },
    diningHall: {
        type: String,
        default:""
    },
    rating: {
        type: Number, 
        min: 1, 
        max:5,
        default:1
    }
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;