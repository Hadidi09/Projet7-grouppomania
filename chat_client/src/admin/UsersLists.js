import React, { useEffect, useState } from 'react';
import {Table} from "react-bootstrap";
import axios from "axios";

const UsersLists = () =>
{
    const [ListUsers, setListUsers] = useState([])
    useEffect(() =>
    {
        axios(`http://localhost:8000/api/user/allusers`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        }).then(res =>
        {
            console.log(res.data.message)
            const AllUsers = res.data.message;
            console.log(AllUsers);
            
            setListUsers(AllUsers);
        })
    }, [])
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
                    {ListUsers.map((val, key) =>
                    {
                        return (
                            <tr key={key}>
                                <td>{val.id}</td>
                                <td>{val.username}</td>
                                <td>{val.email}</td>
                                <td><button>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default UsersLists;