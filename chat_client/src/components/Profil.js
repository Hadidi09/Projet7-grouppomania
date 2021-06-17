//import axios from 'axios'
import React from 'react'
import { withRouter } from 'react-router-dom'
//import { AuthContext } from '../layout/AuthContext'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'
import NavBar from '../layout/Navbar'
const Profil = () => {
//   const idContext = useContext(AuthContext)
//   console.log(idContext)
//   useEffect(() => {
//     const userId = async () => {
//       await axios(`http://localhost:8000/api/user/profil/${idContext}`).then(
//         (res) => console.log(res)
//       )
//     }
//     return userId
//   }, [idContext])

  return (
    <div>
      <NavBar />
      <h1>La page Profil </h1>
      <Container className='d-flex justify-content-center flex-column'>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Card style={{ width: '18rem' }}>
              <Card.Img
                variant='top'
                style={{ width: '100%', height: '100%' }}
                src='https://findicons.com/files/icons/982/dellipack_2/128/people.png'
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant='primary'>Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <div className='informations'>
              <h2>Vos informartions</h2>
              <Form>
                <Form.Group controlId='formGroupEmail'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type='text' placeholder='Enter username' />
                </Form.Group>
                <Form.Group controlId='formGroupEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type='email' placeholder='Enter email' />
                </Form.Group>
                <Form.Group controlId='formGroupPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' placeholder='Password' />
                </Form.Group>
                <Button className='mt-2' variant='primary'>
                  Update
                </Button>{' '}
                <Button className='mt-2' variant='danger'>
                  Delete
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(Profil)