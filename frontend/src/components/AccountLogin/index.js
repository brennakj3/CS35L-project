import React, { useEffect, useState } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

    function handleLoginChange(event)
    {
    const {name, value} = event.target;

    setLoginData(prevData=> ({

        ... prevData,
        [name]: value,

    }));
    console.log(loginData);
    }

    // TO DO: should check if username and password is in database
    async function handleLogin(event){};

    // TO DO: should store new username and password in database
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
        const response = await fetch('http://localhost:5000/createUser', input);
        const data = await response.json();

        console.log(data);
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
        </div>
    );
}
export default AccountLogin;