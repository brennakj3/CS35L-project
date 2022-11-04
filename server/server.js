const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
require("dotenv").config({ path: "../config.env"}); //dotenv is used to access .env variables in a file
const PORT =  process.env.PORT;
//mongoose.connect("mongodb+srv://brennakj3:f2*96xYpCtbR%40yT@cs35l-final-project.d0cgy5p.mongodb.net/?retryWrites=true&w=majority");

// Connection URI
const uri = "mongodb+srv://brennakj3:f2*96xYpCtbR%40yT@cs35l-final-project.d0cgy5p.mongodb.net/?retryWrites=true&w=majority";
//Connect and check connection using mongoose
mongoose.connect(process.env.DB_URI, {
}).catch(err => console.log(err.reason));  //according to mongoose documentation this will output what the error was, doesnt really work

mongoose.connection.on('connected', ()=>{
    console.log("Database connection successful")
});
console.log(`Server is running on port: ${PORT}`);



//Some basic route methods from express documentation page, each one should access some mongoose model and do something to it to edit database
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
  })
app.post('/', (req, res) => {
    res.send('POST request to the homepage')
})