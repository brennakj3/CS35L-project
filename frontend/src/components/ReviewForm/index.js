import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//react-bootstrap makes it easier to add pretty and functional components 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


/*ReviewForm is the form the user can fill out to make a new post */
/*TODO: reset form and give user a notification their review was posted 
Need to implement star ranking, might want to install another package for that (mdbreact maybe)
Need to fix styling, text box and option select shouldn't fill page 
Need to implement actually signup/login, then add username being retrieved from current user*/
function ReviewForm({}){
    const [reviewData, setReviewData] = useState({   
      //setting up the states for a review, essentially its variables
        user:"",
        body:"",
        diningHall:"",
        rating:0
    });
    //This just updates the states whenever something is changed
    function handleReviewChange(event){
        const {name, value} = event.target;

        setReviewData(prevData=> ({

            ...prevData,
            [name]: value,
            
        }));
        console.log(reviewData);
    };
    async function handlePost(event){
    //This function communicates with the server to add a review to the database
    event.preventDefault();
    const newReview={
      user: reviewData.user,
      body: reviewData.body,
      diningHall: reviewData.diningHall,
      rating: reviewData.rating };
        
    const input={
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newReview)
    };
    //uses fetch to make a http request to the backend with our reviewData and some other input
    const response = await fetch('http://localhost:5000/createReview', input);
    const data = await response.json();
    //data might be used to update something to the screen eventually
    console.log(data);  //outputs to console for debugging

    
    }


    
    return (
      <>
      <Form>
        <Form.Group controlID="userText">
          <Form.Label>Username</Form.Label>
          <Form.Control as="textarea" rows={1}
            name="user"
            id="username"
            onChange={handleReviewChange}
            placeholder="Username"
            value={reviewData.user}/>
        </Form.Group>
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
        <Form.Group controlID="starSelect">
          <Form.Label>Rating</Form.Label>
          <Form.Control as="select" name="rating" onChange={handleReviewChange}>
            <option value= "1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>  
            <option value="4">4 Stars</option> 
            <option value="5">5 Stars</option>  
          </Form.Control>
        </Form.Group>
      <Button variant="primary" onClick={handlePost}>Post</Button>
      </Form>
      </>
    );
}





export default ReviewForm;