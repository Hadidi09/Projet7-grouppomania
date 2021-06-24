import axios from 'axios'
import React, { useEffect, useState } from 'react';
//import { toast } from 'react-toastify'
import { useParams } from 'react-router'
import { Form, Button} from 'react-bootstrap'
import Footer from '../layout/Footer'
import NavBar from '../layout/Navbar'
import { useHistory, withRouter } from 'react-router-dom'



const Post = () =>
{
    
    const [description, setDescription] = useState("")
    const [postList, setPostList] = useState([])
    const [UserId, setUserId] = useState([])
    const [file, setFile] = useState(null)
    const { id } = useParams()
    //const [refresh, setRefresh] = useState("")
    const history = useHistory()

    useEffect(() => {
        const userId =  () => {
           axios(`http://localhost:8000/api/user/profil/${id}`, {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }).then((response) => {
              console.log(response)
              setUserId(response.data.message.id)
          })
        }
        return userId()
    }, [id])
    
    useEffect(() => {
        const postImages = () =>
        {
            axios("http://localhost:8000/api/user/", {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(response =>
            {
                console.log(response);
                // const res = JSON.parse(response)
                // console.log(res);
                const AllPost = response.data.message
                console.log(AllPost);
               // console.log(AllPost.data);
                 setPostList(AllPost)
                 //console.log(postList);
            })
        }
        
        return postImages()
       // toast.info('Welcome to the room ')
    }, [])

  

    const onChangeImage = (e) =>
  {
    const image = e.target.files[0]
    setFile(image)
  }
  // Fonction qui va envoyer l'image vers le serveur
  const uploadImage = (e) =>
  {
    e.preventDefault()
    const formData = new FormData()
    console.log(file);
      formData.append("image", file)
      formData.append("description", description)
      formData.append("UserId", UserId)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
      return axios.post("http://localhost:8000/api/user/uploads", formData, config)
     
      
          .then(res =>
          {
              console.log(res);
            //   const data = [file, description, UserId]
            //   setPostList([...postList, data])
            //   console.log(postList);
            history.push(`/post/${id}`)
          });
             
  }
    return (
        <div className="container">
            <NavBar />
       
            <div className='container_Post'>
                
                <div className="display_post">
                    { postList.map((val) =>
                    {
                        console.log(val);
                        return (
                            <div className="containerimages" key={val.id}>
                            <p>{val.User.username} : <img src={val.data} alt="images" /></p> 
                        </div>
                        )
                    })
                    
                    } 
            
                </div>
               
            </div>
            <Form  className="d-flex justify-content-center align-items-center flex-column" encType="multipart/form-data" onSubmit={uploadImage} >
                    <Form.Group>
                        <Form.File type="file" name="image" id="exampleFormControlFile1" onChange={onChangeImage} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Control size="lg" value={description} name="description" type="text" placeholder="Large text"
                        onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Button className="my-2" variant="primary" type="submit" > Send Post </Button>
                </Form>
            <Footer />  
        </div>
    );
};

export default withRouter(Post) ;