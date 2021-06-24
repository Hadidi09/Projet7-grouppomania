import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { useParams } from 'react-router';
import './App.css'
import './scss/index.scss'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import Navigation from "./components/Navigation";
import Login from './components/Login'
import Home from './components/Home'
import ChatRoom from './components/ChatRoom'
import Connect from './components/Connect'
import ProtectedRoutes from './helpers/ProtectedRoutes'
import Profil from './components/Profil'
import Post from './components/Post'

function App () {
  return (
    <div className='App'>
      <Router forceRefresh>
        {/* <Navigation /> */}

        <Switch>
           <Route path='/login' component={Login} />
          <ProtectedRoutes exact path='/profil/:id' component={Profil} />
          <ProtectedRoutes path='/chatroom/:id' component={ChatRoom}  />
          <ProtectedRoutes exact path='/' component={Home} />
          <ProtectedRoutes exact path='/post/:id' component={Post} />
            {/* <ChatRoom />
          </ProtectedRoutes> */}
          <Route path='/connect' component={Connect} />
          <Route path='/' component={() => <div>Erreur 404 not found</div>} />
        </Switch>

      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
