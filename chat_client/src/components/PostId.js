import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios'
import Footer from '../layout/Footer';
import Navbar from '../layout/Navbar';
import {Card, Container, Row, Col } from "react-bootstrap";
const PostId = () =>
{
    const [userName, setUserName] = useState("")
    const [messageList, setMessageList] = useState([]);
    const [ message, setMessage] = useState("")
    const [postList, setPostList] = useState("");
    const [userId, setUserId] = useState("")
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
               setUserId(MyPost.id)
          
                const user = localStorage.getItem("username")
                console.log(user);
                setUserName(user)
        })
    }, [id, postList])
    
  
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
              
              //console.log(messageList);
               
              
       })
    }, [id])
    const UpdateMessage = () =>
    {
        const content = {
            userName: userName,
            message: message,
            PostId: userId
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
    return (
        <div>
            <Navbar />
            <h1>coucou la compagnie</h1>
            <Container fluid className="container_onepost">
                <Row>
                    <Col md={12}>
                        <div className="display_post_one">
              
                
                            <div className="container_image" >
                            
                                <Card style={{ width: "18rem" }}>
                                <Card.Img variant="top" src={postList} alt="images" />
                                <Card.Body>
                                    <Card.Title>{userName}</Card.Title>
                                </Card.Body>
                                </Card>
                                <button>click</button>
                            </div>
                            <div className="messagelist">
                                {messageList.map((val) =>
                                {
                                    return (
                                        <p className="post-message">{val.message }</p>
                                    )
                                })}
                            </div>
         
                        </div>
                        
                        
                    </Col>
                </Row>
                <Row>
                <Col md={12}>
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