import React, { useState } from 'react';
import styles from './styles.module.css';

function Review({}){
    const [reviewData, setReviewData] = useState({
        //username: ""   --figure out how to retrieve username from current user 
        body:"",
        ranking:"",
        diningHall:""
    });

    function handleReviewChange(event){
        const {name, type, value, checked} = event.target;

        setReviewData(prevData=> ({

            ...prevData,
            [name]: type ==="checkbox" ? checked : value,
            
        }));
        console.log(reviewData);
    };


    async function handlePost(event){
    //this will include some fetch/post request for updating database
    event.preventDefault();
    const newReview={...reviewData};
    const input={
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newReview)
    };
    const response = await fetch('http://localhost:5000/createReview', input);
    const data = await response.json();
    //data might be used to update something to the screen
    console.log(data);
    }
    //NOTE: the buttons currently aren't recording the correct dining hall, plan to change to dropdown menu anyway so its okay
    return(
        
      <form>
        <label htmlFor="review">Review</label><br/>
        <textarea
          type="text"
          name="body"
          id="review"
          onChange={handleReviewChange}
          placeholder="Start your review here..."
          value={reviewData.body}
          className={styles["text-input"]}
        />
    
        <fieldset className={styles["selection-box"]}>
            <legend>Dining Hall</legend>
            <input 
          type="radio"
          name="diningHall"
          value="De Neve"
          checked={reviewData.diningHall === "De Neve"}
          onChange={handleReviewChange}
          className={styles["radio-input"]}
        />
        <label htmlFor="type">De Neve</label>
        <br />
        
        <input 
          type="radio"
          name="diningHall"
          value="Bruin Plate"
          checked={reviewData.diningHall === "Bruin Plate"}
          onChange={handleReviewChange}
          className={styles["radio-input"]}
        />
        <label htmlFor="Bruin Plate">Bruin Plate</label>
        <br />
        
        <input 
          type="radio"
          name="diningHall"
          value="Epicuria"
          checked={reviewData.diningHall === "Epicuria"}
          onChange={handleReviewChange}
          className={styles["radio-input"]}
        />
        <label htmlFor="Epicuria">Epicuria</label>
        <br />
        </fieldset>
        <button className={styles["post-button"]} onClick={handlePost}>Post</button>
      </form>
    );
}
export default Review;