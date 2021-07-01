import React, { useEffect, useState }  from 'react';
import { Table } from "react-bootstrap";
import axios from "axios";




const PostsLists = () =>
{
  const [postList, setPostList] = useState([])
  
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
        
    }, []);
  
  
    return (
        <div>
           <Table striped bordered hover variant="secondary" className="tableau">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                        
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.map((val, key) =>
                    {
                        return (
                            <tr key={key}>
                                <td>{val.id}</td>
                                <td>{val.User.username}</td>
                                <td>{val.User.email}</td>
                                
                                <td><button >Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default PostsLists;