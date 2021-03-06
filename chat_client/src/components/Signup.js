import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";



const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ role, setRole] = useState(false)
 
  const history = useHistory();


  const login = (e) => {
     e.preventDefault();
    let regEmail = new RegExp('^[a-z0-9_-]+@[a-z]+.[a-z]{2,3}$')
    let regPassword = new RegExp('^(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$')
    
    if (!regEmail.test(email))
    {
      return alert("please enter email valid")
    }
    if (!regPassword.test(password))
    {
      return alert("Votre Mot de Passe doit contenir au moins 1 majuscule, 1 lettre minuscule, 1 caractère spécial, min:8 caractères, max: 20 caractères")
    }
    else
    {
      axios
    .post("http://localhost:8000/api/auth/signup", {
      username: username,
      email: email,
      password: password,
      role: role,
    })
    .then((data) => {
      console.log(data);

      setUserName("");
      setEmail("");
      setPassword("");
      setRole(false)
      history.push("/connect");
    });
    }
    
    
  };

 
  return (
    <div className="container-login">
      <Navbar />
      <Container fluid className="d-flex justify-content-center ">
      
      <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
              
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
             
            />
          </Form.Group>

          <Button
            className="m-3"
            variant="danger"
            onClick={() => history.push("/connect")}
          >
            Login
          </Button>
          <Button className="m-3" variant="success" onClick={login}>
            Submit
          </Button>
        </Form>
      </Container>
      
      <Footer />
    </div>
  );
};

export default Signup;
