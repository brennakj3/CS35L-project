import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//react-bootstrap makes it easier to add pretty and functional components 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';
import StarsRating from 'react-star-rate';
//import { Alert } from 'bootstrap';
import Alert from 'react-bootstrap/Alert';


/*ReviewForm is the form the user can fill out to make a new post */
/*TODO: g ive user a notification their review was posted 
Need to implement star ranking, might want to install another package for that (mdbreact maybe)
Need to fix styling, text box and option select shouldn't fill page 
Need to implement actually signup/login, then add username being retrieved from current user*/
function ReviewForm(_){
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState({   
      //setting up the states for a review, essentially its variables
    body:"",
    diningHall:"De Neve", //this is default because dropdown is originally on De Neve
  });
  const [rating,setRating] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const[showPostAlert, setShowPostAlert] = useState(false);
    //This just updates the states whenever something is changed
  function handleReviewChange(event){
    const {name, value} = event.target;
    
    setReviewData(prevData=> ({

      ...prevData,
      [name]: value,
            
      }));
      console.log(reviewData); // for debugging
  };

  async function handlePost(event){
    const blankForm ={
      body: "",
      diningHall:"De Neve",
    };
    if (sessionStorage.getItem('userLoggedIn')=='false'){
      setShowLoginModal(true);
      setReviewData(blankForm);
      setRating(1);
      return;
    }
    //This function communicates with the server to add a review to the database
    event.preventDefault();
    const newReview={
      user: sessionStorage.getItem('user'), //looks at current user logged in for username
      body: reviewData.body,
      diningHall: reviewData.diningHall,
      rating: rating };
        
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
    setShowPostAlert(true);
    setReviewData(blankForm); //Add something to notify user their form was sent 
    setRating(1);
  }
  
  
  

  function LoginModal(){
    return (
      <Modal show = {showLoginModal} onHide={()=>setShowLoginModal(false)} >
        <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Create an account to post a review!</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <p>
          Log in or sign up before writing a review. </p>
          <Button variant="primary" onClick={()=>navigate('/login')}>Login/Signup</Button>
        </Modal.Body>
  
        </Modal.Dialog>
      </Modal>
  
  
    );
  }
  function PostAlert(){
    return(
      <div class="alert">
      <Alert variant='success' show={showPostAlert} onClose={() => setShowPostAlert(false)} dismissible>
        <Alert.Heading> Success!</Alert.Heading>
        <p>Your review was successfully posted. </p>
      </Alert>
      </div>
    );
  }
    
    return (
      <>
      <LoginModal />
      <div class="post">
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
        <StarsRating 
          value={rating}
          allowHalf={false}
          defaultValue={1}
          onChange= {rating =>{setRating(rating); console.log(rating);}} />
        </Form.Group>
      <Button variant="primary" onClick={handlePost}>Post</Button>
      </Form>
      </div>
      <PostAlert />
      </>
    );
}




export default ReviewForm;