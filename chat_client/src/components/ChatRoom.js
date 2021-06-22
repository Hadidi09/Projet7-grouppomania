import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'
import { Card, Button, Toast } from 'react-bootstrap'
import io from 'socket.io-client'
import Footer from '../layout/Footer'
import NavBar from '../layout/Navbar'
import { useHistory, withRouter } from 'react-router-dom'


// Ma variable socket
let socket;
// Mon composant ChatRoom
const ChatRoom = () =>
{
  // Mes variables et mes states
  const history = useHistory()
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  const [UserId, setUserId] = useState([])

  const [userName, setUsername] = useState('')
  const [room, setRoom] = useState('')

  const [profil, setProfil] = useState([])
  const EndPoint = 'localhost:8000/'

  const [file, setFile] = useState(null)

  const { id } = useParams()
//Mon useEffect qui sera en charge de la connexion bidirectionnel entre le client et le serveur
  useEffect(() => {
    socket = io(EndPoint, {
      transports: ['websocket', 'polling', 'flashsocket']
    })
    socket.emit('join', {network:"network", post:"post"})
    socket.on('newconnect', (data) => {
      console.log(data)
      setRoom(data)
    })
    socket.on('messages', (data) => {
      console.log(data)
      const receiveData = JSON.parse(data.message)
      console.log(receiveData)
      setMessageList(receiveData)
    })
    // // socket.on("receive_files", (data) =>
    // // {
    // //   console.log(data);
    // //   const receiveData = JSON.parse(data.message)
    // //   console.log(receiveData)
      
     
    // })
    toast.info('Welcome to the room ')
  }, [EndPoint])
// Mon useEffect qui ecoute et recoit la list des messages
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList([...messageList, data])
    })
  })

// Fonction qui ecoute le changement au niveau de l'input file
  const onChangeImage = (e) =>
  {
    const image = e.target.files[0]
    setFile(image)
  }
  // Fonction qui va envoyer l'image vers le serveur
  const uploadImage = () =>
  {
    const formData = new FormData()
    console.log(file);
    formData.append("image", file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post("http://localhost:8000/api/user/uploads", formData, config)
      .then(res => console.log(res.data))
      
  }
  // Mon useEffect qui permet recupérer les informations de l'utlisateur
  useEffect(() => {
    const userId =  () => {
       axios(`http://localhost:8000/api/user/profil/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then((response) => {
        console.log(response)
        console.log(response.data.message)
        setUsername(response.data.message.username)
        setProfil([response.data.message])
        setUserId(response.data.message.id)
      })
    }
    return userId()
  }, [id])
// Fonction qui permet à l'utilisateur d'envoyer un message
  const sendMessage = async () => {
    const messageContent = {
      content: {
        message: message,
        userName: userName,
        UserId: UserId,
        date: new Date()
      }
    }

    await socket.emit('send_message', messageContent)
    setMessageList([...messageList, messageContent.content])
    setMessage('')
  }
  return (
    <div className='contenu'>
      <NavBar />

      <div className='container_chat'>
        <div className='display-message'>
          { 
            messageList.map((val) =>
            {
              return (
                <div className='containermessage' key={val.id}>
                  <p > {val.userName} : {val.message}</p>
                   
                </div>
              )        
            })
          }
        </div>
       
        <div className='input-message'>
          <input
            type='text'
            value={message}
            placeholder='message...'
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <button onClick={sendMessage}>Envoyer</button>
        </div>
      </div>
      <div className='profil'>
        {profil.map((val, index) => {
          return (
            <div key={index}>
              <Card style={{ width: '13rem' }}>
                <Card.Img variant='top' src='holder.js/100px180' />
                <Card.Body>
                  <Card.Title>{val.username}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant='primary'>Go somewhere</Button>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
      <div className='listconnections'>
        <Toast>
          <Toast.Header>
            <img
              src='https://findicons.com/files/icons/982/dellipack_2/128/people.png'
              className='rounded mr-2'
              alt='logo'
            />
            <strong className='mr-auto'>Groupomania</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{room}</Toast.Body>
        </Toast>
      </div>
     
        <input type="file" encType="multipart/form-data"   name="image"  onChange={onChangeImage} />
        <button onClick={uploadImage} >upload</button>
   
      
      <button onClick={() => history.push(`/profil/${id}`)}>
        go to the profil
      </button>

      <Footer />
    </div> 
  )
}

export default withRouter(ChatRoom) 
