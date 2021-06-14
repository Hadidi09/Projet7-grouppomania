import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useParams } from 'react-router';
import "./App.css";
import "./scss/index.scss";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
//import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
//import Button from 'react-bootstrap/Button';
import ChatRoom from "./components/ChatRoom"
import Connect from "./components/Connect";
import Profil from "./components/Profil";
import ProtectedRoutes from "./helpers/ProtectedRoutes";

//import { AuthContext } from "./layout/AuthContext";


function App()
{
  const [isAuth, setIsAuth] = useState(false)
  
  useEffect(() =>
  {
    const verifyToken = localStorage.getItem('token')
    console.log(verifyToken);
    if (verifyToken)
    {
      setIsAuth(true)
    }
    else
    {
      setIsAuth(false)
    }
  }, [])
  
  return (
    <div className="App">
     

      <Router forceRefresh={true}>
        {/* <Navigation /> */}
        
        <Switch>
          <Route path="/Login"  component={Login} />
          <Route exact path="/" component={Register} />
      
            <Route path="/chatroom/:id">
              <ChatRoom />
              </Route>
             
            <ProtectedRoutes path="/profil/:id" component={Profil} isAuth={ isAuth} />
            <Route path="/connect" component={Connect}  />
         
          
          <Route path="/" component={() => <div >Erreur 404 not found</div>} />
        </Switch>
      
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
