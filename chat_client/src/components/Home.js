import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import io from 'socket.io-client'
// import {Container,Row,Col,Button,Alert,Breadcrumb,Card,Form} from "react-bootstrap";
import NavBar from '../layout/Navbar'
import Footer from '../layout/Footer'
// import ChatRoom from "./ChatRoom";

let socket

const Home = () => {
  const EndPoint = 'http://localhost:8000'

  useEffect(() => {
    socket = io(EndPoint, { transports: ['polling', 'websocket'] })

    socket.emit('test', 'I send you a Message')
  }, [EndPoint])
  return (
    <div className='container_form  '>
      <NavBar />

      {/* <input type="text" placeholder="FirstName..." />
      <input type="text" placeholder="LastName..." />
      <input type="email" placeholder="Email..." />
      <input type="password" placeholder="PassWord..." />
      <Button variant="success" className="my-2">
        Like me{" "}
      </Button>
      <Alert variant="warning">my button alert</Alert>

      <Container>
        <Form>
          <Row>
            <Col lg-12>
              <Form.Group>
                <Form.Label>Votre Adresse</Form.Label>
                <Form.Control type="email" placeholder="example@yahoo.fr" />
                <Form.Text>Votre Adresse Email s'il vous plaît</Form.Text>
              </Form.Group>
            </Col>
            <Col lg-12>
              <Form.Group>
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="password" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item>lien1</Breadcrumb.Item>
              <Breadcrumb.Item>lien2</Breadcrumb.Item>
              <Breadcrumb.Item active>lien3</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Card className="d-flex flex-column justify-content-center align-items-center">
          <Card.Img
            style={{ width: "700px" }}
            src="https://images.unsplash.com/photo-1593642702909-dec73df255d7?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          />
          <Card.Body>
            <Card.Title>My first Card ever</Card.Title>
            <Card.Text>
              Unique text Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Nobis, quasi quia corporis amet enim iusto earum, ipsum
              recusandae iste, eius atque molestiae. Ipsa natus cumque
              cupiditate repellendus officiis, neque doloremque.
            </Card.Text>
          </Card.Body>
        </Card>
          </Container> */}
      <Footer />
    </div>
  )
}

export default withRouter(Home) 
