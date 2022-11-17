import React, { useEffect, useState } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 

// this is just the oversimplified front end of the login page, will do more later
// TO DO: the async functions, righ now they do nothing 
// TO DO: maybe blur out password characters for security purposes 


function AccountLogin({}){
    const [loginData, setLoginData] = useState ({
        user:"",
        pass:"",
        newuser:"",
        newpass: ""
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

    //checks if username and password are valid
    async function handleLogin(event){
        const input = loginData.user;
        const response = await fetch(`http://localhost:5000/getUser/${input}`);
        const data = await response.json();

        if( data.length === 1)
        {
            const thisUser = data[0];
            if(thisUser.pass === loginData.pass)
            {
                console.log("Success");

                //logs user in by setting current user to that username
                sessionStorage.setItem('user', thisUser.user); 
                sessionStorage.setItem('userLoggedIn','true');
                handleShow(); 

            }
            else
            {
                console.log("Incorrect Password");    
                handleShow(); 
            }
        }
        else
        {
            console.log("Invalid Username");
            handleShow(); 
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

    // stores new username and password in database
    async function handleSignUp(event){
        event.preventDefault();
        const newUser={
            user: loginData.newuser,
            pass: loginData.newpass
        };
        const input={
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        };

        // finds number of accounts with that name
        var num = await checkNewUser(loginData.newuser);

        if( num === 0)
        {
            const response = await fetch('http://localhost:5000/createUser', input);
            const data = await response.json();

            sessionStorage.setItem('user', JSON.stringify(newUser.user)); //not sure if data.name is a string, might need to stringify
            //other components should be able to check if the user is logged in and get their name with getItem
            sessionStorage.setItem('userLoggedIn','true');
            handleShow(); 

        }

        else
        {
            console.log("Username taken");
            handleShow(); 
        }
    };

    return(
        <div>
            <h3>Login</h3>
            <Form>
            <Form.Group controlID="userText">
                <Form.Label>Username</Form.Label>
                <Form.Control as="textarea" rows={1}
                   name="user"
                   id="username"
                   onChange={handleLoginChange}
                   placeholder="Username"
                   value={loginData.user}/>
            </Form.Group>
            <Form.Group controlID="passText">
                <Form.Label>Password</Form.Label>
                <Form.Control as="textarea" rows={1}
                   name="pass"
                   id="password"
                   onChange={handleLoginChange}
                   placeholder="Password"
                   value={loginData.pass}/>
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
            </Form>
        <h3>Sign Up</h3>
        <Form>
            <Form.Group controlID="userText">
                <Form.Label>Username</Form.Label>
                <Form.Control as="textarea" rows={1}
                   name="newuser"
                   id="newusername"
                   onChange={handleLoginChange}
                   placeholder="Username"
                   value={loginData.newuser}/>
            </Form.Group>
            <Form.Group controlID="passText">
                <Form.Label>Password</Form.Label>
                <Form.Control as="textarea" rows={1}
                   name="newpass"
                   id="newpassword"
                   onChange={handleLoginChange}
                   placeholder="Password"
                   value={loginData.newpass}/>
            </Form.Group>
            <Button variant="primary" onClick={handleSignUp}>SignUp</Button>
            </Form>

            <Modal show= {show} onHide= {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="Title">Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p id="Body">Body</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} >Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default AccountLogin;