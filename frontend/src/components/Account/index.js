
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
function Account(){
    //So far just has a button to let the user log out
    async function handleLogout(event){
        sessionStorage.setItem('userLoggedIn','false');
        sessionStorage.setItem('user','');
    }
    
    return(
    <div>
      <Link to="/login">
        <Button variant="primary" onClick={handleLogout}>Log Out</Button>
      </Link>
    </div>

    );
}
export default Account;