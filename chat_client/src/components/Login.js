import React, { useState } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'

const Login = () => {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const login = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8000/api/auth/signup', {
        username: username,
        email: email,
        password: password
      })
      .then((data) => {
        console.log(data)

        setUserName('')
        setEmail('')
        setPassword('')

        history.push('/connect')
      })
  }

  
  // const test = (e) =>
  // {
  //     e.preventDefault()
  //     console.log(username, email, password);
  // }
  return (
    <div className="container-login">
      <Navbar />
      <Container fluid className ="d-flex justify-content-center ">
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>username</Form.Label>
            <Form.Control
              type='text'
              value={username}
              placeholder='Enter username'
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          
          <Button className="m-3" variant='danger' onClick={() => history.push('/connect')}>
            Login
          </Button>
          <Button className="m-3" variant='success' onClick={login}>
            Submit
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  )
}

export default Login
