import React, { useEffect, useState } from "react"; 
//want this to display some information about the dining hall 
//and display all reviews for De Neve
//Might be able to clean up Dining Hall pages so they are all one component eventually
import './diningHall.css'

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

  useEffect(()=> {
    async function getReviews() {
        const input=  "De Neve";
        const response = await fetch(`http://localhost:5000/getReviews/${input}`);
        //might need to include some feedback for a fetching error 
        if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            console.log(message);
            return;
          }
       
        const reviews = await response.json();
        console.log(reviews); //thinks reviews just returned nothing
        setReviews(reviews);


    }
    getReviews();

}, []);

function allReviews(){
    return reviews.map((review)=>{
       
        return(
            <Review review= {review} />
        );
        

    });
}

return(
    <div>
      <h3 className="title">De Neve Reviews</h3>
      <p>{allReviews()}</p>
     
   </div>

);
}
export default DeNeve;