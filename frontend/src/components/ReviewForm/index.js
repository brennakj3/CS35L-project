import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//react-bootstrap makes it easier to add pretty and functional components 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


/*ReviewForm is the form the user can fill out to make a new post */
/*TODO: g ive user a notification their review was posted 
Need to implement star ranking, might want to install another package for that (mdbreact maybe)
Need to fix styling, text box and option select shouldn't fill page 
Need to implement actually signup/login, then add username being retrieved from current user*/
function ReviewForm({}){
  const [reviewData, setReviewData] = useState({   
      //setting up the states for a review, essentially its variables
    body:"",
    diningHall:"De Neve", //this is default because dropdown is originally on De Neve
    rating:1
  });
  const [showLoginModal, setShowLoginModal] = useState(false);
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
    const blankForm ={
      body: "",
      diningHall:"De Neve",
      rating: 1
    };
    if (sessionStorage.getItem('userLoggedIn')=='false'){
      setShowLoginModal(true);
      setReviewData(blankForm);
      return;
    }
    //This function communicates with the server to add a review to the database
    event.preventDefault();
    const newReview={
      user: sessionStorage.getItem('user'), //looks at current user logged in for username
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
  
    setReviewData(blankForm); //Add something to notify user their form was sent 
  }

  function LoginModal(){
    return (
      <Modal show = {showLoginModal} onHide={()=>setShowLoginModal(false)} >
        <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create an account to post a review!</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <p>Log in or sign up before writing a review. </p>
        </Modal.Body>
  
        </Modal.Dialog>
      </Modal>
  
  
    );
  }
    
    return (
      <>
      <LoginModal />
      <Form>
      <Form.Group controlID="diningSelect">
          <Form.Label>Dining Hall</Form.Label>
          <Form.Control as="select" name="diningHall" onChange={handleReviewChange}>
            <option value="De Neve">De Neve</option>
            <option value="Bruin Plate">Bruin Plate</option>
            <option value="Epicuria">Epicuria</option>   
          </Form.Control>
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