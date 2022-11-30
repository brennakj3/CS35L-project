import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; //getting some css from bootstrap

import ReviewForm from './components/ReviewForm';
import TopNavbar from './components/Navbar';
import DiningHall from './components/DiningHall'
import AccountLogin from './components/AccountLogin';
import Account from './components/Account';
import SearchBar from './components/SearchBar'

//App handles all major routing to other webpages to display React pages

function App() {
  return (
    <div>
    <TopNavbar /> 
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/review" element={<ReviewForm />}  />
        <Route path="/de_neve" element={<DiningHall name = "De Neve" />} /> 
        <Route path="/epicuria" element={<DiningHall name = "Epicuria" />} /> 
        <Route path="/bruin_plate" element={<DiningHall name = "Bruin Plate" />} /> 
        <Route path="/login" element={<AccountLogin/>} />
        <Route path="/account" element={<Account/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

