
import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


import ReviewForm from './components/ReviewForm';
import TopNavbar from './components/Navbar';
import DeNeve from './components/DeNeve'

//App handles all major routing to other webpages to display React pages

function App() {
    //const [reviews, setReviews] = useState([]);
    

  //TODO: Add routing to other pages, currently Epicuria and Bruin plate don't go anywhere
  //The <Route path="" element={} /> sections add routing to a react component by webpage url
  //E.x "/" just routes to the home page of localhost
  return (
    <div>
    <TopNavbar /> 
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<ReviewForm />} />
        <Route path="/de_neve" element={<DeNeve />} />  
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

