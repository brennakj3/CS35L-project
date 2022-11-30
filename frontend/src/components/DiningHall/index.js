import React, { useEffect, useState } from "react";
//Displays all of the reviews for a dining Hall

import './diningHall.css'
import StarsRating from 'react-star-rate';
import DNBackground from '../DiningHall/assets/DeNeveMain.jpeg'
import EBackground from '../DiningHall/assets/epiMain.jpg'
import BPBackground from '../DiningHall/assets/BplateMain.jpg'

//This Review function just handles how each review displays
function Review(props){
    return(
      <div className="post">
        <h6>{props.review.user}</h6>
        <h6>{props.review.rating} stars</h6>
          <p>{props.review.body}</p>
      </div>


    );
  
}

function DiningHall(props){
    const {name} = props;
    const [reviews, setReviews] = useState([]);
    var [averageRating, setAverageRating] =useState([]);
    //This useEffect gets all reviews with dining hall: this dining hall and sets this page's reviews to all of them
  useEffect(()=> {
    async function getReviews() {
        const input=  name;
        //makes http request to server to get all the dining hall reviews from this dining hall from the database
        const response = await fetch(`http://localhost:5000/getReviews/${input}`);
        //some feedback for a fetching error 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
          }
       
        const reviews = await response.json();
        
        // Reviews should be sorted from highest to lowest rating
        var tempReviews = reviews;
        let count = 0;
        do {
            count = 0;
            for (let i = 0; i < tempReviews.length - 1; i++) {
                if (tempReviews[i].rating < tempReviews[i + 1].rating) {
                    let temp = tempReviews[i];
                    tempReviews[i] = tempReviews[i + 1];
                    tempReviews[i + 1] = temp;
                    count++;
                }
            }
        } while (count > 0);
        
        setReviews(tempReviews); //sets reviews to reviews obtained from database
        var totalRatings =0;
        var numReviews=0;
        reviews.map((review) =>{
          totalRatings+= review.rating;  //check if this works 
          numReviews+=1;
          let roundedAverage = (totalRatings/numReviews)*2;
          roundedAverage= Math.round(roundedAverage)/2;  //rounds number to the nearest .5
          setAverageRating(roundedAverage);
        });
    }
    getReviews();
    
}, []);

//Maps all reviews obtained from the database into their own Review component
function allReviews(){
    // console.log(reviews);
    return reviews.map((review) => {
        return(
            <Review review={review}/>
        );
    });
}


//Displays all of the components onto the page
//Gives Description of the restaurant
var Background;
var description;
var link;
var linkText;
if( name === "De Neve" ) {
  Background = DNBackground;
    description = "Specializing in cuisine of the Americas.";
    link = "https://portal.housing.ucla.edu/dining-locations/de-neve";
    linkText = "See what De Neve has to offer.";
}
else if( name === "Bruin Plate" ) {
  Background = BPBackground;
    description = "A leader in healthy, sustainable and mindful eating.";
    link = "https://portal.housing.ucla.edu/dining-locations/bruin-plate";
    linkText = "Learn more about Bruin Plate";
}
else if( name === "Epicuria" ) {
  Background = EBackground;
    description = "Simple, delicious Mediterranean meals.";
    link = "https://portal.housing.ucla.edu/dining-locations/epicuria-covel";
    linkText = "Read more about Epicuria at Covel";
}
return(
  <div className="display">
    <div className={name} style={{
      backgroundSize: "100%",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${Background})`,
      position: "relative",
      zIndex: "1",
    }}>
      <h3 className="title">{name} Reviews</h3>
      <div className="ratingBox">
        <h4 className="rating">Overall Rating: {averageRating} Stars </h4>
        <StarsRating disabled={true} value={averageRating} className={"stars"} />
      </div>
      <div className="descriptionBox">
       <p className="description">{description}</p>
       <a href={link} className="descriptionLink" target="_blank">{linkText}</a>
      </div>
      <p>{allReviews()}</p>
    </div>
   </div>

);
}
export default DiningHall;
