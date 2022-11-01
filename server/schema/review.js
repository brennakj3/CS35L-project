import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    user: String,
    body: String,
    stars: {type: Number, min: 0, max:5}
});
const Review = mongoose.model("Review", reviewSchema);