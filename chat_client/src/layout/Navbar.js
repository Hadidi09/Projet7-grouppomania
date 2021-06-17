// import axios from 'axios';
import React from 'react'
import { withRouter, useParams } from 'react-router'
import { Container, Navbar, Nav } from 'react-bootstrap'
//import { NavLink } from 'react-router-dom'
import logo from '../images/img/icon-above-font.png'

const NavBar = () => {
  // const history = useHistory()
  let { id } = useParams()

  // const[ user, setUser] = useState("")

  // useEffect(() =>
  // {

  //   const userId = async () =>
  //   {
  //       await axios(`http://localhost:8000/api/user/profil/${id}`, {
  //           headers: {
  //            Authorization: localStorage.getItem("token")
  //        }
  //    })

  //              .then(response =>
  //              {
  //                  console.log(response);
  //                  console.log(response.data.message);
  //                setUser(response.data.message.username)

  //              })

  //     }
  //    return userId()
  // }, [id])
  return (
    <div>
      <Navbar bg='secondary' expand='lg'>
        <Container className='d-flex'>
          <Navbar.Brand href='#home'>
            <img src={logo} alt='logo' width='85' height='85' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {/* <NavLink to='/'>Home</NavLink>
              <NavLink to='/profil/:id'>Profil</NavLink>
              <NavLink to='chatroom/:id'>Chat</NavLink> */}
              <Nav.Link href="/" >Home</Nav.Link>
          <Nav.Link href={`/profil/${id}`}>Profil</Nav.Link>
         <Nav.Link href={`/chatroom/${id}`}>Chat</Nav.Link>
                          
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default withRouter(NavBar)
