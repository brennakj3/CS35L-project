const mongoose = require("mongoose");
//Model for diningHall, not sure if this will be necessary
const diningSchema = new mongoose.Schema({
    name: String,
    description: String,
    //stars: {type: Number, min: 0, max:5} - not sure if this should be here since it is variable based on review calculation
});
const Dining = mongoose.model("Dining", diningSchema);
module.exports = Dining;