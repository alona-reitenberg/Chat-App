import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useUpdateUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import defaultProfile from "../assets/profile-pic.png";
import "./Settings.css";
import plus from "../assets/plus-icon.png";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const navigate = useNavigate();
  const navRef = useRef(navigate);
  const user = useSelector((state) => state.user);
  const userInfo = user;
  // const userUpdate = useSelector((state) => state.userUpdate);
  // const { loading, error, success } = userUpdate;
  useEffect(() => {
    if (!userInfo) {
      console.log("bla bka" + userInfo);
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPassword(userInfo.password);
      setImage(userInfo.picture);
    }
    console.log("the userlogin setting:", user.name);
  }, [navigate, userInfo]);
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const url = user.picture;
    updateUser({
      userId: userInfo._id,
      name,
      email,
      password,
      newPassword,
      picture: url,
    }).then(({ data }) => {
      if (data) {
        console.log(data);
        navigate("/chat");
      }
    });
  }

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className="d-flex align-items-center justify-content-center flex-direction-column edit-box"
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleUpdate}>
            <h1 className="text-center">Edit Account Settings</h1>
            <div className="signup-profile-pic__container">
              <img
                src={user.picture}
                className="signup-profile-pic"
                alt="profile"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <img src={plus} className="add-photo-icon" />
              </label>
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/png, image/jpeg"
                //  onChange={validateImg}
              />
            </div>
            {/* {error && <p className="alert alert-danger">{error.data}</p>} */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="input-settings"
                type="text"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                style={{ backgroundColor: " rgba(255, 255, 255,  0.5)" }}
              />
              {/* {console.log("the name is:", userLogin.name)} */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{ backgroundColor: " rgba(255, 255, 255,  0.5)" }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Accordion className="mb-3" defaultActiveKey={["1"]}>
              <Accordion.Item
                eventKey="0"
                style={{ backgroundColor: " rgba(255, 255, 255,  0.5)" }}
              >
                <Accordion.Header>Change Password</Accordion.Header>
                <Accordion.Body>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Old password</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <Form.Label>New password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                  </Form.Group>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={5} className="signup__bg"></Col>
      </Row>
    </Container>
  );
}
export default Settings;
