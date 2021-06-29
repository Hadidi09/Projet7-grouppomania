import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import axios from 'axios'

const EditPost = () =>
{
    const [username, setUserName] = useState("")
    const [message, setMessage] = useState([]);
    const [userId, setUserId] = useState("")
    const { id } = useParams()
    useEffect(() =>
    {
        axios(`http://localhost:8000/api/user/comments/${id}`,
         {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
            })
            .then(res =>
            {
                const mesMessage = res.data.message
                console.log((mesMessage.message));
                setMessage(mesMessage.message)
                setUserId(mesMessage.User.id)
               // console.log(message);
                
                setUserName(mesMessage.userName)
        })
    }, [id])
    const UpdateMessage = () =>
    {
        const content = {
            username: username,
            message: message,
            id: userId
        }
        const config = {
            headers: {
                
                Authorization: localStorage.getItem("token"),
            }
        }
        axios.put(`http://localhost:8000/api/user/comments/${id}/edit`,content, config
        )
    }
    return (
        <div>
            <h1>coucou la compagnie</h1>
            <div className="display-message-edit">
             
                  <div className="containermessage-edit" >
                    <p>
                      <span className="span-username">{username}</span>{" "}
                    </p>

                    <div className="small-date">
                      <p className="para"> {message}</p>
                      <small>{}</small>
                    </div>
                  </div>
                
              
            </div>
            <div className="input-message">
              <input
                type="text"
                // value={message}
                placeholder="message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button onClick={UpdateMessage}>modifier</button>
            </div>
        </div>
    );
};

export default EditPost;