import logo from './logo.svg';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import app from '../../../server/server';
import ReviewForm from './components/ReviewForm';
import TopNavbar from './components/Navbar';
import DeNeve from './components/DeNeve';
import AccountLogin from './components/AccountLogin';

import { useEffect } from 'react';

//TODO: Have reviews show up somewhere to test GET requests 
function App() {
    //const [reviews, setReviews] = useState([]);
    
    /* Some useEffect that handles fetching all reviews
    useEffect(()=>{
      
    });
    */

    

  //TODO: Add routing to other pages, currently navbar doesn't go anywhere
  //Probably will need to install react-router-dom for routing
  return (
    <div>
    <TopNavbar /> 
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<ReviewForm />} />
        <Route path="/de_neve" element={<DeNeve />} />
        <Route path="/login" element={<AccountLogin/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

