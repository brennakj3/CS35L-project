import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Review from '../Review'
 
function Account(){
    const [reviews, setReviews] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    
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
            setReviews(reviews);
            
            // filters the list of reviews for only those made by the current user
            var tempReviews = [];
            reviews.map((review) => {
                var reviewUser = review.user;
                
                if (reviewUser === sessionStorage.getItem('user'))
                    tempReviews.push(review);
                
                return review;
            });
            
            // sort by restaurant (default sorting)
            let count = 0;
            do {
                count = 0;
                for (let i = 0; i < tempReviews.length - 1; i++) {
                    if (tempReviews[i].diningHall > tempReviews[i + 1].diningHall) {
                        let temp = tempReviews[i];
                        tempReviews[i] = tempReviews[i + 1];
                        tempReviews[i + 1] = temp;
                        count++;
                    }
                }
            } while (count > 0);
            
            setUserReviews(tempReviews);
        }
        getReviews();
    }, []);
    
    const sortReviews = (event) => {
        // filters the list of reviews for only those made by the current user
        var tempReviews = [];
        reviews.map((review) => {
            var reviewUser = review.user;
            
            if (reviewUser === sessionStorage.getItem('user'))
                tempReviews.push(review);
            
            return review;
        });
        
        // sort alphabetically by restaurant name
        var sortType = event.target.value;
        if (sortType === "restaurant") {
            let count = 0;
            do {
                count = 0;
                for (let i = 0; i < tempReviews.length - 1; i++) {
                    if (tempReviews[i].diningHall > tempReviews[i + 1].diningHall) {
                        let temp = tempReviews[i];
                        tempReviews[i] = tempReviews[i + 1];
                        tempReviews[i + 1] = temp;
                        count++;
                    }
                }
            } while (count > 0);
        }
        
        // sort by rating (highest to lowest)
        if (sortType === "rating") {
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
        }
        
        setUserReviews(tempReviews);
        console.log(userReviews);
    }
    
    // shows the review HTML elements
    function showReviews() {
        if(userReviews.length !== 0) {
            const test = userReviews.map((review) => {
                return(
                       <Review review={review}/>
                );
            });
            console.log(test)
            return test;
        }
    }
    
    return(
        <div className="menu">
            <select className="menuSelect" name="Sort by" onChange={sortReviews}>
                <option className="option" value="restaurant">By Restaurant</option>
                <option className="option" value="rating">Highest Rated</option>
            </select>
            <p>{showReviews()}</p>
        </div>
    );
}
export default Account;

