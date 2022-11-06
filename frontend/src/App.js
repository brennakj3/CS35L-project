import logo from './logo.svg';
import './App.css';
//import app from '../../../server/server';
import Review from './components/Review/index';

import { useEffect } from 'react';
function App() {
    //const [reviews, setReviews] = useState([]);
    
    /* Some useEffect that handles fetching all reviews
    useEffect(()=>{
      
    });
    */



  return (
    <div className="App">
      <Review  />
    </div>
  );
}

export default App;
