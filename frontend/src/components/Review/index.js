import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
            [name]: value,
            
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
    //data might be used to update something to the screen eventually
    console.log(data);  //outputs to console for debugging
    }
    //TODO: Need to implement star ranking, might want to install another package for that (mdbreact maybe)
    // Need to fix styling, text box and option select shouldn't fill page
    return (
      <>
      <Form>
        <Form.Group controlID="reviewText">
          <Form.Label>Review</Form.Label>
          <Form.Control as="textarea" rows={3}
            name="body"
            id="review"
            onChange={handleReviewChange}
            placeholder="Start your review here..."
            value={reviewData.body}/>
        </Form.Group>
        <Form.Group controlID="diningSelect">
          <Form.Label>Dining Hall</Form.Label>
          <Form.Control as="select" name="diningHall" onChange={handleReviewChange}>
            <option value="De Neve">De Neve</option>
            <option value="Bruin Plate">Bruin Plate</option>
            <option value="Epicuria">Epicuria</option>   
          </Form.Control>
        </Form.Group>
      <Button variant="primary" onClick={handlePost}>Post</Button>
      </Form>
      </>
    );
}





export default Review;