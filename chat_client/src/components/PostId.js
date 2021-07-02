import React, { useEffect, useState } from 'react';
import Moment from "react-moment";
import { useParams } from "react-router";
import axios from 'axios'
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import { Card, Container, Row, Col,Modal, Button, Toast } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const PostId = () =>
{
    const [userName, setUserName] = useState("")
    const [messageList, setMessageList] = useState([]);
    const [ message, setMessage] = useState("")
    const [postList, setPostList] = useState("");
    const [PostId, setPostId] = useState("")
    const [UserId, setUserId] = useState("")
    const [userPost, setUserPost] = useState("")
    
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   
    const verifyAdmin =  JSON.parse(localStorage.getItem("isAdmin")) 
    const verifyUserName = localStorage.getItem("username")
    console.log(verifyUserName);
    console.log(verifyAdmin);
    const history = useHistory();
    const { id } = useParams()
    useEffect(() =>
    {
        axios(`http://localhost:8000/api/user/post/${id}`,
         {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
            })
            .then(res =>
            {
                console.log(res);
                const MyPost = res.data.message
                console.log((MyPost));
                setPostList(MyPost.data)
                setPostId(MyPost.id)
                console.log(PostId);
                setUserId(MyPost.UserId)
                console.log(UserId);
                const user = localStorage.getItem("username")
                console.log(user);
                setUserName(user)
                setUserPost(MyPost.userName)
                console.log(userPost);
        })
    }, [id, postList, UserId,PostId, userPost])
    
  
    useEffect(() =>
    {
        axios(`http://localhost:8000/api/user/allcommentspost/${id}`,
        {
           headers: {
               Authorization: localStorage.getItem("token"),
           }
           })
           .then(res =>
           {
               console.log(res);
               const MyPost = res.data.message
               console.log((MyPost));
              setMessageList( MyPost)
       })
    }, [id])

    ///
    const UpdateMessage = () =>
    {
        const content = {
            userName: userName,
            message: message,
            PostId: PostId
        }
        const config = {
            headers: {
                
                Authorization: localStorage.getItem("token"),
            }
        }
        axios.post(`http://localhost:8000/api/user/post/comments/${id}`,content, config
        ).then(res =>
        {
            console.log(res);
            //const
            setMessageList([...messageList, content])
            setMessage("")
        })
    }
///
    const deletePost =  (e) =>
    {
       e.preventDefault()
       
        
         axios.delete(`http://localhost:8000/api/user/post/user/${PostId}`,  {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        history.goBack();
      });
    }
    return (
        <div className="postid"> 
            <Navbar />
           
            <Container fluid className="container_onepost">
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
                                <Toast.Body>Post Room</Toast.Body>
                            </Toast>
                            </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="display_post_one">
                        
                            <button onClick={() => history.goBack()}>Go Back</button>
                
                            <div className="container_image" >
                            
                                <Card style={{ width: "18rem" }}>
                                <Card.Img variant="top" src={postList} alt="images" />
                                <Card.Body>
                                    
                                </Card.Body>
                                </Card>
                                {
                                    verifyUserName === userPost || verifyAdmin === true ? (
                                        <Button variant="danger" className="m-2" onClick={handleShow}>delete</Button>
                                    ) : (
                                          null  
                                    )
                                }
                                <>
                               <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Suppression de compte</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Voulez-vous vraiment supprimer le post ?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                        annuler
                                        </Button>
                                        <Button variant="primary" onClick={deletePost}>
                                        supprimer le post
                                        </Button>
                                    </Modal.Footer>
                                    </Modal>
                                    </>
                            </div>
                            <div className="messagelist">
                                {messageList.map((val) =>
                                {
                                    return (
                                        <div className="containermessage" key={val.id}>
                                            <p key={val.id}>
                                            <span className="span-username">{val.userName}</span>{" "}
                                            </p>

                                            <div className="small-date">
                                            <p className="para"> {val.message}</p>
                                            <small><Moment>{val.createdAt}</Moment></small>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
         
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
                        <button onClick={UpdateMessage}>envoyer</button>
                    </div>
                        
                    </Col>
                </Row>
                
                    
              
            </Container>
           
            
            <Footer/>
        </div>
    );
};

export default PostId;