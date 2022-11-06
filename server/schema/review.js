const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: String,
    body: String,
    diningHall: String,
    stars: {type: Number, min: 0, max:5}
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;