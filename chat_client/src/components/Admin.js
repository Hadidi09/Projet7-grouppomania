import React, { useEffect} from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import UsersLists from '../admin/UsersLists';
import PostsLists from '../admin/PostsLists';
//import EditPost from '../admin/EditPost';

const Admin = (props) =>
{
    const verifyAdmin =  JSON.parse(localStorage.getItem("isAdmin")) 
    console.log(verifyAdmin);
    const history = useHistory();
    const { id } = useParams();
    useEffect(() => {
        const userId = () => {
          axios(`http://localhost:8000/api/user/profil/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }).then((response) => {
            console.log(response);
            
           
          });
        };
        return userId();
      }, [id]);

     
    return (
        <div>
            <Navbar />
            <div className="admin-content">
            
            {
                !verifyAdmin ?
                    (
                        <> { history.goBack()} </>
                    )
              : (<>
                <div className="d-flex justify-content-center">
                   <h1>Administrateur</h1>
                </div>
                
                <div>
                  <h2>Users</h2>
                  <UsersLists />
                </div>
                <div>
                  <h2>Les Posts</h2>
                   <PostsLists />
                </div>
                       
                
                       </> 
                    )
               
            }
        </div>
            <Footer/>
        </div>
        
    );
};

export default Admin;