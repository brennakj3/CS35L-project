import React, { useEffect, useState } from "react"; 
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 

import './login.css'

// TO DO: maybe blur out password characters for security purposes 


function AccountLogin(_){
    const [loginData, setLoginData] = useState ({
        user:"",
        pass:"",
        newuser:"",
        newpass: "",
    });


    // handle new user input
    function handleLoginChange(event)
    {
    const {name, value} = event.target;

    setLoginData(prevData=> ({

        ... prevData,
        [name]: value,

    }));
    console.log(loginData);
    }

    // for pop ups
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var [title, setTitle] =useState([]);
    var [body, setBody] =useState([]);
    var [page, setPage] =useState(false); 

    //checks if username and password are valid
    async function handleLogin(event){
        if (page === false){

        const input = loginData.user;
        const response = await fetch(`http://localhost:5000/getUser/${input}`);
        const data = await response.json();

        if( data.length === 1)
        {
            const thisUser = data[0];
            if(thisUser.pass === loginData.pass)
            {
                console.log("Success");
                setTitle("Welcome");
                setBody("");


                //logs user in by setting current user to that username
                sessionStorage.setItem('user', thisUser.user); 
                sessionStorage.setItem('userLoggedIn','true');
                
                handleShow(); 

            }
            else
            {
                console.log("Incorrect Password");    
                setTitle("Incorrect Password");
                setBody("Please try again");
                handleShow(); 
            }
        }
        else
        {
            console.log("Invalid Username");
            setTitle("Invalid Username");
            setBody("Please try again");
            handleShow(); 
        }
    }
    // sign up
    if(page === true){
        const newUser={
            user: loginData.user,
            pass: loginData.pass
        };
        const input={
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        };

        // finds number of accounts with that name
        var num = await checkNewUser(loginData.user);

        if( num === 0)
        {
            const response = await fetch('http://localhost:5000/createUser', input);
            const data = await response.json();
            setTitle("Welcome");
            setBody("");

            sessionStorage.setItem('user', newUser.user); //not sure if data.name is a string, might need to stringify
            //other components should be able to check if the user is logged in and get their name with getItem
            sessionStorage.setItem('userLoggedIn','true');
            
            handleShow(); 

        }

        else
        {
            console.log("Username taken");
            setTitle("Username taken");
            setBody("Please try again");
            handleShow(); 
        }
    };

    //for displaying popup messages
    function messages(str)
    {
        if (str.localeCompare("title") === 0)
        {
            return title;
        }
        else if(str.localeCompare("body") === 0)
        {
            return body; 
        }
        else
        {
            return "error"; 
        }
    }
    };

    // ensures username is not taken 
    async function checkNewUser(user)
    {
        const input = user; 
        const response = await fetch(`http://localhost:5000/getUser/${input}`);
        const data = await response.json();
        return data.length; 

    }

    //for displaying popup messages
    function messages(str)
    {
        if (str.localeCompare("title") === 0)
        {
            return title;
        }
        else if(str.localeCompare("body") === 0)
        {
            return body; 
        }
        else
        {
            return "error"; 
        }
    }

    // switching to account page once logged in 
    function switchPage(event)
    {
        handleClose();
        if( sessionStorage.getItem('userLoggedIn') === 'true')
        {
            window.location.href = "/account";
        }
    }
 
    // censor password button for login
    const [passShown, setPassShown] = useState(true); 
    const censorPass = () => 
    {
        if (passShown === true){
            document.getElementById("password").type = "text";
        }
        if (passShown === false){
            document.getElementById("password").type = "password";
        }
        setPassShown(!passShown);
        console.log(passShown);
    };


    // show and hide sign up
    function showSignUp(){
        if (page === false){
        setPage(!page); 
        document.getElementById("loginTitle").innerHTML = "Sign Up";
        document.getElementById("showPage").innerHTML = "Back to Login";
        document.getElementById("click").innerHTML = "Sign Up";
        }
        if(page === true){
        setPage(!page);
        document.getElementById("loginTitle").innerHTML = "Login";
        document.getElementById("showPage").innerHTML = "Sign Up";
        document.getElementById("click").innerHTML = "Login";
        }
    };


    return(
        <div>
            <div id= "Login" class= "post">
            <h3 id = "loginTitle" class="title">Login </h3>
            <p>              </p>
            <Form>
                <div class="input-group row">
            <Form.Group controlID="userText">
                <Form.Label>Login</Form.Label>
                <Form.Control as="textarea" rows={1}
                   name="user"
                   id="username"
                   onChange={handleLoginChange}
                   placeholder="Username"
                   value={loginData.user}/>
            </Form.Group>
            <Form.Group controlID="passText">
                <Form.Label>Password</Form.Label>
                <div class="input-group">
                {/* <Form.Control as="textarea" rows={1} */}
                <input as="textarea" rows={1}
                   class = "form-control"
                   type="password"
                   name="pass"
                   id="password"
                   onChange={handleLoginChange}
                   placeholder="Password"
                   value={loginData.pass}/>
                   <Button variant ="outline-secondary" onClick={censorPass}> <img src=" https://static-00.iconduck.com/assets.00/eye-password-hide-icon-512x512-iv45hct9.png" height="15" width ="15" alt=""/>
                        </Button>
                </div>
            </Form.Group>
            </div>
            <div class = "text-center">
            <h3>   </h3>
            <Button id= "click" class="btn btn-primary button" onClick={handleLogin}>Login</Button>
            <Button id = "showPage" class="btn btn-primary" onClick={showSignUp}>Sign Up</Button>
            </div>
            </Form>
            </div>

            <Modal show= {show} onHide= {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >{messages("title")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{messages("body")}</p>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="primary" onClick={switchPage} >Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}
export default AccountLogin;