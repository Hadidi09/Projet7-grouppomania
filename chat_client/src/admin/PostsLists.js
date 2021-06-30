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
            // const res = JSON.parse(response)
            // console.log(res);
            const AllPost = response.data.message;
            console.log(AllPost);
            // console.log(AllPost.data);
            setPostList(AllPost);
            //console.log(postList);
          });
        };
    
        return postImages();
        // toast.info('Welcome to the room ')
      }, []);
    return (
        <div>
           <Table striped bordered hover variant="dark" className="tableau">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {postList.map((val, key) =>
                    {
                        return (
                            <tr key={key}>
                                <td>{val.id}</td>
                                <td>{val.username}</td>
                                <td>{val.email}</td>
                                <td><button>Update</button></td>
                                <td><button>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default PostsLists;