import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

import "./Home.css";

function Home() {
  const user = useSelector((state) => state.user);
  return (
    <div className=" home__bg d-flex flex-direction-column align-items-center justify-content-center style-text">
      <Col md={5}>
        <h1 className="title">Share the world with your friends</h1>
        <p>Chat App lets you connect with the world</p>
        {!user && (
          <LinkContainer to="/login">
            <Button variant="success">
              Get Started <i className="fas fa-comments home-message-icon"></i>
            </Button>
          </LinkContainer>
        )}

        {user && (
          <LinkContainer to="/chat">
            <Button variant="success">
              Get Started <i className="fas fa-comments home-message-icon"></i>
            </Button>
          </LinkContainer>
        )}
      </Col>
      <Col md={4} className="text-center">
        <img src={require("../assets/home-img.png")} className="home-img" />
      </Col>
    </div>
  );
}

export default Home;
