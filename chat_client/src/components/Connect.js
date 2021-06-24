import React, { useState } from 'react'

import { Container, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'
import NavBar from '../layout/Navbar'
import Footer from '../layout/Footer'
import axios from 'axios'

const Connect = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const login = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8000/api/auth/login', {
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res)
        if (res.data.status === 401)
        {
          <Redirect
              to={{ pathname: '/login' }}
            />
        } else
        {
           localStorage.setItem('token', res.data.token )
        }
        setEmail('')
        setPassword('')

        history.push(`/chatroom/${res.data.id}`)
      })
  }

  return (
    <div className="container-connect">
      <NavBar/>
      <Container fluid className ="d-flex justify-content-center">
        <Form>
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

          <Button className="my-4" variant='success' onClick={login}>
            Submit
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  )
}

export default Connect
