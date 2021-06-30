import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./scss/index.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ChatRoom from "./components/ChatRoom";
import Connect from "./components/Connect";
import ProtectedRoutes from "./helpers/ProtectedRoutes";
import Profil from "./components/Profil";
import Post from "./components/Post";
import Admin from "./components/Admin";
import PostId from "./components/PostId";


function App() {
  return (
    <div className="App">
      <Router forceRefresh>
        <Switch>
          <Route path="/login" component={Signup} />
          <ProtectedRoutes exact path="/profil/:id" component={Profil} />
          <ProtectedRoutes path="/chatroom/:id" component={ChatRoom} />
          <ProtectedRoutes exact path="/" component={Home} />
          <ProtectedRoutes exact path="/post/:id" component={Post} />
          <ProtectedRoutes exact path="/post/user/:id" component={PostId} />
          <ProtectedRoutes exact path="/admin/:id" component={Admin} />
          

          <Route path="/connect" component={Connect} />
          <Route path="/" component={() => <div>Erreur 404 not found</div>} />
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
