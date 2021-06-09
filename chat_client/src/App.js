import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import "./scss/index.scss";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
//import Button from 'react-bootstrap/Button';
import ChatRoom from "./components/ChatRoom"
import Connect from "./components/Connect";

function App() {
  return (
    <div className="App">
     

      <Router forceRefresh={true}>
        <Navigation />
        
        <Switch>
          <Route path="/Login"  component={Login} />
          <Route path="/register"  component={Register} />
          <Route path="/chatroom/:id">
            <ChatRoom />
            </Route>
          <Route path="/connect" component={Connect} />
          <Route path="/" component={() => <div >Erreur 404 not found</div>} />
        </Switch>
        
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
