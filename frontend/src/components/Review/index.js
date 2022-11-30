import React from "react";
import "./review.css";
//This handles how a review displays
function Review(props){
    return(
      <div className="post">
        <h6>{props.review.user}</h6>
        <h6 className="dh">{props.review.diningHall}</h6>
        <h6>{props.review.rating} stars</h6>
          <p>{props.review.body}</p>
      </div>


    );
  
}
export default Review;