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
// import Button from 'react-bootstrap/Button';
import ChatRoom from './components/ChatRoom'
import Connect from './components/Connect'

import ProtectedRoutes from './helpers/ProtectedRoutes'
import Profil from './components/Profil'
//import  isAuth  from "./helpers/ProtectedRoutes" 


// import { AuthContext } from "./layout/AuthContext";

function App () {
//   const [isAuths, setIsAuths] = useState(false)
// console.log(isAuth);
//   useEffect(() =>
//   {
//     const verify = () =>
//     {
        
      
//       if (!isAuth === null) {
//         setIsAuths(true)
//       } else {
//         setIsAuths(false)
//       }
//     }
//     return verify()
   
//   }, [ isAuths])
// console.log(isAuth)
  return (
    <div className='App'>

      <Router forceRefresh>
        {/* <Navigation /> */}

        <Switch>
          <ProtectedRoutes exact path='/profil/:id' component={Profil} />
          <ProtectedRoutes path='/chatroom/:id' component={ChatRoom}  />
          <Route path='/login' component={Login} />
          <ProtectedRoutes exact path='/' component={Home}  />

         
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
