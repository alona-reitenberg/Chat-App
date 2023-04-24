import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../context/appContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { socket } = useContext(AppContext);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  function handleLogin(e) {
    e.preventDefault();
    // login logic
    loginUser({ email, password }).then(({ data }) => {
      if (data) {
        // socket work
        socket.emit("new-user");
        // navigate to the chat
        navigate("/chat");
      }
    });
  }
  return (
    <div className="login__bg  d-flex align-items-center justify-content-center flex-direction-column">
      <Form className="container-box" onSubmit={handleLogin}>
        <h1 className="text-center">Welcome</h1>
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          {error && <p className="alert alert-danger">{error.data}</p>}
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className="input-bg"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </Form.Group>
        <div class="text-center mb-3">
          <Button variant="primary" type="submit">
            {isLoading ? <Spinner animation="grow" /> : "Login"}
          </Button>
        </div>
        <div>
          <p className="text-center">
            Don't have an account ? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
