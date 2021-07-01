import axios from "axios";
import React, { useEffect, useState } from "react";
//import { toast } from 'react-toastify'
import { useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Toast,
} from "react-bootstrap";
import Footer from "../layout/Footer";
import NavBar from "../layout/Navbar";
import { useHistory, withRouter } from "react-router-dom";

const Post = () => {
  const [description, setDescription] = useState("");
  const [postList, setPostList] = useState([]);
  const [UserId, setUserId] = useState([]);
  const [ userName, setUserName] = useState("")
  const [file, setFile] = useState(null);
  const { id } = useParams();
  //const [refresh, setRefresh] = useState("")
  //const [ message, setMessage] = useState([])
  const history = useHistory();

  useEffect(() => {
    const userId = () => {
      axios(`http://localhost:8000/api/user/profil/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response);
        setUserId(response.data.message.id);
        setUserName(response.data.message.username)
        localStorage.setItem("username", response.data.message.username)
      });
    };
    return userId();
  }, [id]);

  useEffect(() => {
    const postImages = () => {
      axios("http://localhost:8000/api/user/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response);
        
        const AllPost = response.data.message;
        console.log(AllPost);
       
        setPostList(AllPost);
       
      });
    };

    return postImages();
    // toast.info('Welcome to the room ')
  }, []);

  const onChangeImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
  };
  // Fonction qui va envoyer l'image vers le serveur
  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(file);
    formData.append("image", file);
    formData.append("description", description);
    formData.append("UserId", UserId);
    formData.append("userName", userName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    };
    return axios
      .post("http://localhost:8000/api/user/uploads", formData, config)

      .then((res) => {
        console.log(res);
       
        history.push(`/post/${id}`);
      });
  };

  return (
    <div className="container">
      <NavBar />

      <Container fluid className="container_Post">
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
                <Toast.Body>un toast</Toast.Body>
              </Toast>
            </div>
          </Col>
          <Col xs={12} md={6}>
            <div className="display_post">
              {postList.map((val) => {
                console.log(val);
                return (
                  <div className="containerimages" key={val.id}>
                    {/* <p>{val.User.username} : <img src={val.data} alt="images" /></p>  */}
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={val.data} alt="images" />
                      <Card.Body>
                        <Card.Title>{val.User.username}</Card.Title>
                      </Card.Body>
                    </Card>
                    <button className="voir_post" onClick={() => { history.push(`/post/user/${val.id}`) }}>Voir Le post</button>
                  </div>
                  
                );
              })}
              {
                  
                }
            </div>
          </Col>
         
        </Row>
      </Container>
      <Form
        className="d-flex justify-content-center align-items-center flex-column"
        encType="multipart/form-data"
        onSubmit={uploadImage}
      >
        <Form.Group>
          <Form.File
            type="file"
            name="image"
            id="exampleFormControlFile1"
            onChange={onChangeImage}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            size="lg"
            value={description}
            name="description"
            type="text"
            placeholder="Large text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button className="my-2" variant="primary" type="submit">
          {" "}
          Send Post{" "}
        </Button>
      </Form>
      <Footer />
    </div>
  );
};

export default withRouter(Post);