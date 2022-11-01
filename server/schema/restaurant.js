import mongoose from 'mongoose';
const { Schema } = mongoose;

const diningSchema = new Schema({
    name: String,
    description: String,
    //stars: {type: Number, min: 0, max:5} - not sure if this should be here since it is variable based on review calculation
});
const Dining = mongoose.model("Dining", diningSchema);