import React from "react";
//This just handles how a review displays, can be changed to look better if needed 
function Review(props){
    return(
      <div className="post">
        <h6>{props.review.user}</h6>
        <h6>{props.review.rating} stars</h6>
          <p>{props.review.body}</p>
      </div>


    );
  
}
export default Review;