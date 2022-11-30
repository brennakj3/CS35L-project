import React, { useEffect, useState } from "react"; 

import "./searchBar.css"
import Review from '../Review'
import {Search} from 'react-bootstrap-icons'
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

        //makes http request to server to get all the dining hall reviews from this dining hall from the database
        const response = await fetch(`http://localhost:5000/getReviews`); //TODO: add similar logic for Bplate and epicuria once they get their own review page
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
            var currentReviewDiningHall = review.diningHall; 
            //make sure the search is done case insensitive
            currentReviewBody = currentReviewBody.toLowerCase();
            currentReviewDiningHall = currentReviewDiningHall.toLowerCase(); 
            enteredWord = enteredWord.toLowerCase();
            if( currentReviewBody.includes( enteredWord ) || currentReviewDiningHall.includes( enteredWord ) )
            {
                matchingReviews.push( review );
                console.log( matchingReviews );
            }
        })
        
        // sort by restaurant (default sorting)
        let count = 0;
        do {
            count = 0;
            for (let i = 0; i < matchingReviews.length - 1; i++) {
                if (matchingReviews[i].diningHall > matchingReviews[i + 1].diningHall) {
                    let temp = matchingReviews[i];
                    matchingReviews[i] = matchingReviews[i + 1];
                    matchingReviews[i + 1] = temp;
                    count++;
                }
            }
        } while (count > 0);
        
        
        setFilteredReviews( matchingReviews );
        console.log( filteredReviews );
    }
    function showReviews(){
        if (filteredReviews.length !== 0 && filteredReviews.length !== reviews.length){
        return filteredReviews.map( ( review ) =>{
            return(
                <div>
                    <div>
                        <Review review= {review} />
                    </div>
                    
                </div>
            );
        });
    }
    }
    
    return(
        <div className='search'>
            <div className='searchData'>
               <input type='text' placeholder={placeholder} onChange={handleInput} ></input>                
                <div className='searchIcon'>
                        <Search/>
                </div>
            </div>
            <p>{showReviews()}</p>
        </div>
    );
}

export default SearchBar;
