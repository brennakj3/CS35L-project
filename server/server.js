const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
require("dotenv").config({ path: "../config.env"}); //dotenv is used to access .env variables in a file
const PORT =  process.env.PORT;

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log(err.reason));  //according to mongoose documentation this will output what the error was, doesnt really work

mongoose.connection.on('error', ()=>{
    console.log("Error connecting to database")
});
mongoose.connection.on('connected', ()=>{
    console.log("Database connection successful")
});


const reviewModel = require("./schema/review");
const userModel = require("./schema/user");
const diningModel = require("./schema/restaurant");
const  response  = require("express");

//Some basic route methods from express documentation page, each one should access some mongoose model and do something to it to edit database
app.get('/getReviews', async (req, res) => {
    const reviews = await reviewModel.find({}); //finding all reviews 
    try {
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }

});
app.post('/createReview', async (req, res) => {
    const review = new reviewModel({
        body: req.body.body,
        diningHall: req.body.diningHall,
        ranking: req.body.ranking,
    }); //this might be to be split up more specifically
    try {
        await review.save();
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
});
module.exports = app;