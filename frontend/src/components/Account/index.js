import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Review from '../Review'
 
 
function Account(){
    const [reviews, setReviews] = useState([]);
    var userReviews = [];
    
    // This useEffect hook gets all reviews made by the given user
    useEffect(() => {
        async function getReviews() {
            const response = await fetch('http://localhost:5000/getReviews');
            
            // in case of fetching error
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.log(message);
                return;
            }
            
            const reviews = await response.json();
            console.log(reviews);
            setReviews(reviews);
        }
        getReviews();
    }, []);
    
    function showReviews() {
        reviews.map((review) => {
            var reviewUser = review.user;
            
            if (reviewUser === sessionStorage.getItem('user')) {
                userReviews.push(review);
                console.log(userReviews);
            }
            
            return review;
        });
        
        if(userReviews.length !== 0) {
            return userReviews.map((review) => {
               return(
                   <Review review = {review}/>
               );
            });
        }
    }
    
    return(
        <div className='account'>
           <p>{showReviews()}</p>
        </div>
    );
}
export default Account;

