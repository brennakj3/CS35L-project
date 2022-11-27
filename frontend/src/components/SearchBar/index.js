import React, { useEffect, useState } from "react"; 

import "./searchBar.css"
import Review from '../Review'
// async function getReviews( reviews ) {
//     const deNeve=  "De Neve";
//     const bPlate = "Bruin Plate"
//     const epicuria = "Epicuria"
//     //makes http request to server to get all the dining hall reviews from this dining hall from the database
//     const response = await fetch(`http://localhost:5000/getReviews/${deNeve}`); //TODO: Implement the same logic for other dining halls once reviews are accessible
//     //some feedback for a fetching error 
//     if (!response.ok) {
//         const message = `An error occurred: ${response.statusText}`;
//         console.log(message);
//         return;
//       }
   
//     reviews = await response.json();
//     console.log(reviews); //used for debugging
//     var totalRatings =0;
//     var numReviews=0;
// }   

// console.log( "here" );
// console.log( reviews );

function SearchBar({}){
    const placeholder = "Search for a review...";
    const [reviews, setReviews] = useState([]);
    const [ filteredReviews, setFilteredReviews ] = useState( [] );
    //This useEffect gets all reviews with dining hall: this dining hall and sets this page's reviews to all of them
  useEffect(()=> {
    async function getReviews() {
        const deNeve=  "De Neve";
        const bPlate = "Bruin Plate";
        const epicuria = "Epicuria"
        //makes http request to server to get all the dining hall reviews from this dining hall from the database
        const response = await fetch(`http://localhost:5000/getReviews/${deNeve}`); //TODO: add similar logic for Bplate and epicuria once they get their own review page
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
    const handleInput = ( event ) => {
        var enteredWord = event.target.value;
        var matchingReviews = [];
        reviews.map(( review ) => {
            var currentReviewBody = review.body;
            //make sure the search is done case insensitive
            currentReviewBody = currentReviewBody.toLowerCase();
            enteredWord = enteredWord.toLowerCase();
            if( currentReviewBody.includes( enteredWord ) )
            {
                matchingReviews.push( review );
                console.log( matchingReviews );
            }
        })
        setFilteredReviews( matchingReviews );
        console.log( filteredReviews );
    }
    function showReviews(){
        if (filteredReviews.length != 0 && filteredReviews.length != reviews.length){
        return filteredReviews.map( ( review ) =>{
            return(
                <Review review= {review} />
            );
        });
    }
    }
    
    return(
        <div className='search'>
            <div className='searchData'>
                <input type='text' placeholder={placeholder} onChange={handleInput} ></input>
                </div>
                
            
            <div className='searchIcon'></div>

            <p>{showReviews()}</p>
            
            
        </div>
    );
}

export default SearchBar;