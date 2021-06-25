import React from "react";
import { withRouter } from "react-router-dom";
// import {Container,Row,Col,Button,Alert,Breadcrumb,Card,Form} from "react-bootstrap";
import NavBar from "../layout/Navbar";
import Footer from "../layout/Footer";

//Mon component Home page
const Home = () => {
  return (
    <div className="container_form  ">
      <NavBar />

      <Footer />
    </div>
  );
};

export default withRouter(Home);
