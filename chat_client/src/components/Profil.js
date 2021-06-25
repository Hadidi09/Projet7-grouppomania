import axios from "axios";
import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Form,
  Modal,
} from "react-bootstrap";
import NavBar from "../layout/Navbar";
import Footer from "../layout/Footer";

// mon component profil  de l'utilisateur
const Profil = () => {
  const history = useHistory();
  const { id } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Fonction de suppression de compte
  const deleteUser = async (e) => {
    e.preventDefault();

    await axios
      .delete(`http://localhost:8000/api/user/profil/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        history.push(`/login`);
      });
  };

  return (
    <div className="page-profil">
      <NavBar />
      <Container
        fluid
        className="d-flex justify-content-center flex-column profil-body "
      >
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                style={{ width: "100%", height: "100%" }}
                src="https://images.freeimages.com/images/small-previews/b6f/alien-1242801.jpg"
                alt="photo de profil"
              />
              <Card.Body>
                <Card.Title>Mon profil </Card.Title>
                <Card.Text>
                  Veuillez entrer une petite description de vous s'il vous plaît
                  !
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <div className="informations">
              <h2>Vos informartions</h2>
              <Form>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button className="mt-2" variant="primary">
                  Update
                </Button>{" "}
                <Button className="mt-2" variant="danger" onClick={handleShow}>
                  Delete
                </Button>
              </Form>
              <>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Suppression de compte</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Voulez-vous vraiment supprimer votre compte ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      annuler
                    </Button>
                    <Button variant="primary" onClick={deleteUser}>
                      supprimer mon compte
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default withRouter(Profil);
