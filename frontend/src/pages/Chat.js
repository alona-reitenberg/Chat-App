import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import "./Chat.css";

function Chat() {
  return (
    <Container style={{ paddingLeft: 0, paddingRight: 0 }} className="chat-box">
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
