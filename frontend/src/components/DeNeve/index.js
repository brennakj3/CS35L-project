import React, { useEffect, useState } from "react"; 
//want this to display some information about the dining hall 
//and display all reviews for De Neve
//Might be able to clean up Dining Hall pages so they are all one component eventually
//import Review from '../Review';

function Review(props){
    return(
      <tr>
        <td>{props.review.user}</td>
        <td>{props.review.body}</td>
        <td>{props.review.diningHall}</td>
        <td>{props.review.rating}</td>
      </tr>
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
    <h3>Reviews</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Username</th>
           <th>Review</th>
           <th>Dining Hall</th>
           <th>Rating</th>
         </tr>
       </thead>
       <tbody>{allReviews()}</tbody>
     </table>
   </div>

);
}
export default DeNeve;