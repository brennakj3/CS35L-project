import React, { useEffect, useState } from "react"; 
//want this to display some information about the dining hall 
//and display all reviews for De Neve
//TODO: Change this to a component for all 3 dining halls, where just title and which reviews show changes
import './diningHall.css'

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

function DeNeve(){
    const [reviews, setReviews] = useState([]);

    //This useEffect gets all reviews with dining hall: De Neve and sets De Neve's reviews to all of them
  useEffect(()=> {
    async function getReviews() {
        const input=  "De Neve";
        //makes http request to server to get all the De Neve reviews from the database
        const response = await fetch(`http://localhost:5000/getReviews/${input}`);
        //some feedback for a fetching error 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
          }
       
        const reviews = await response.json();
        console.log(reviews); //used for debugging
        setReviews(reviews); //sets reviews to reviews obtained from database


    }
    getReviews();

}, []);

//Maps all reviews obtained from the database into their own Review component
function allReviews(){
    return reviews.map((review)=>{
       
        return(
            <Review review= {review} />
        );
        

    });
}

//Displays all of the components onto the page
return(
    <div>
      <h3 className="title">De Neve Reviews</h3>
      <p>{allReviews()}</p>
     
   </div>

);
}
export default DeNeve;