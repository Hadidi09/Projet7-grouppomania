// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withRouter, useParams } from 'react-router'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import logo from '../images/img/icon-above-font.png'

const NavBar = () => {
 
  const [ token, setToken] = useState(false)
  let { id } = useParams()
  const history = useHistory()

  useEffect(() =>
  {
    if (localStorage.getItem("token"))
    {
     return setToken(true) 
    } else
    {
   return  setToken(false)
    }
  }, [token])

  const Logout = () =>
  {
    localStorage.clear()
    history.push('/login')
   
  }

  return (
    <div>
      { !token ? ( 
      <>
        <Navbar bg='secondary' expand='lg'>
        <Container className='d-flex'>
          <Navbar.Brand href='#home'>
            <img src={logo} alt='logo' width='85' height='85' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
                  <Nav.Link href="/" >Home</Nav.Link>
                  <Button variant='success'  onClick={() => history.push('/connect')}>Login</Button>            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </>       
      ) : (
      <>
        <Navbar bg='secondary' expand='lg'>
          <Container className='d-flex'>
              <Navbar.Brand href='#home'>
                <img src={logo} alt='logo' width='85' height='85' />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Nav.Link href="/" >Home</Nav.Link>
                    <Nav.Link href={`/profil/${id}`}>Profil</Nav.Link>
                    <Nav.Link href={`/chatroom/${id}`}>Chat</Nav.Link>
                    <Button variant='danger'onClick={Logout} >Deconnexion</Button>
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
      ) } 
    </div>
  )
}

export default withRouter(NavBar)
