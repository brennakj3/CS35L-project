import logo from './logo.svg';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//import app from '../../../server/server';
import Review from './components/Review/index';
import TopNavbar from './components/Navbar';

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
    <div className="App">
      <TopNavbar /> 
      <Review />
    </div>
  );
}

export default App;

