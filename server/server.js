const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
require("dotenv").config({ path: "../config.env"}); //dotenv is used to access .env variables in a file
const PORT =  process.env.PORT;

//This connects to MongoDB server
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

//Importing the models for the MongoDB database
const reviewModel = require("./schema/review");
const userModel = require("./schema/user");
const diningModel = require("./schema/restaurant");
const response  = require("express");

//Some basic route methods from express documentation page, each one should access some mongoose model and do something to it to edit database
//React frontend makes a http request and then the server sees it and responds with one of these actions
app.get('/getReviews', async (req, res) => {
    const reviews = await reviewModel.find({}); //finding all reviews 
    try {
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }

});
//Fetching all reviews for a particular dining hall
app.get('/getReviews/:diningHall', async (req, res) => {
   
    const reviews = await reviewModel.find({diningHall: req.params.diningHall}); //finding all reviews by Dining Hall
    try {
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }

});

// Gets account info
app.get('/getUser/:user', async (req,res) => {
    console.log("test");
    const user = await userModel.find({user: req.params.user});
    try{
        res.send(user);
    }
    catch(error){
        res.status(500).send(error);
    }
});


//Creating a review and adding it to database
app.post('/createReview', async (req, res) => {
    const review = new reviewModel({
        user: req.body.user,
        body: req.body.body,
        diningHall: req.body.diningHall,
        rating: req.body.rating,
    }); //this might be to be split up more specifically
    try {
        await review.save();
        res.send(review);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Creates a new user profile
app.post('/createUser', async (req, res) => {
    const user = new userModel({
        user: req.body.user,
        pass: req.body.pass,
    });
    try {
        await user.save();
        res.send(user);
    }
        catch(error){
            res.status(500).send(error);
        }
    });
    
    

//Ensures router is listening

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`);
});
module.exports = app;