import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { Container, Row, Col, Card, Button, Toast } from "react-bootstrap";
import io from "socket.io-client";
import Footer from "../layout/Footer";
import NavBar from "../layout/Navbar";
import { useHistory, withRouter } from "react-router-dom";

// Ma variable socket
let socket;
// Mon composant ChatRoom
const ChatRoom = () => {
  // Mes variables et mes states
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [UserId, setUserId] = useState([]);

  const [userName, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const [profil, setProfil] = useState([]);
  const EndPoint = "localhost:8000/";

  //const [file, setFile] = useState(null)

  const { id } = useParams();
  //Mon useEffect qui sera en charge de la connexion bidirectionnel entre le client et le serveur
  useEffect(() => {
    socket = io(EndPoint, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.emit("join", "network");
    socket.on("newconnect", (data) => {
      console.log(data);
      setRoom(data);
    });
    socket.on("messages", (data) => {
      console.log(data);
      const receiveData = JSON.parse(data.message);
      console.log(receiveData);
      setMessageList(receiveData);
    });

    toast.info("Welcome to the room ");
  }, [EndPoint]);
  // Mon useEffect qui ecoute et recoit la list des messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  // Mon useEffect qui permet recupérer les informations de l'utlisateur
  useEffect(() => {
    const userId = () => {
      axios(`http://localhost:8000/api/user/profil/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response);
        console.log(response.data.message);
        setUsername(response.data.message.username);
        setProfil([response.data.message]);
        setUserId(response.data.message.id);
      });
    };
    return userId();
  }, [id]);
  // Fonction qui permet à l'utilisateur d'envoyer un message
  const sendMessage = async () => {
    const messageContent = {
      content: {
        message: message,
        userName: userName,
        UserId: UserId,
        date: new Date().toLocaleString() + "",
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };
  return (
    <div className="contenu">
      <NavBar />

      <Container fluid className="container_chat">
        <Row>
          <Col xs={12} md={3}>
            <div className="listconnections">
              <Toast>
                <Toast.Header>
                  <img
                    src="https://findicons.com/files/icons/982/dellipack_2/128/people.png"
                    className="rounded mr-2"
                    alt="logo"
                  />
                  <strong className="mr-auto">Groupomania</strong>
                  <small>{new Date().toLocaleString() + ""}</small>
                </Toast.Header>
                <Toast.Body>{room}</Toast.Body>
              </Toast>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="display-message">
              {messageList.map((val) => {
                console.log(val);
                return (
                  <div className="containermessage" key={val.id}>
                    <p key={val.id}>
                      <span className="span-username">{val.userName}</span>{" "}
                    </p>

                    <div className="small-date">
                      <p className="para"> {val.message}</p>
                      <small>{val.createdAt}</small>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="input-message">
              <input
                type="text"
                value={message}
                placeholder="message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button onClick={sendMessage}>Envoyer</button>
            </div>
          </Col>
          <Col xs={12} md={3}>
            <div className="profil">
              {profil.map((val, index) => {
                return (
                  <div className="card-user" key={index}>
                    <Card>
                      <Card.Body>
                        <Card.Title>{val.username}</Card.Title>
                        <Card.Text>
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary">Profil</Button>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>

      <button onClick={() => history.push(`/profil/${id}`)}>
        go to the profil
      </button>

      <Footer />
    </div>
  );
};

export default withRouter(ChatRoom);
