import React, { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import "./login.css";
import { useNavigate } from "react-router-dom";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Alert } from "bootstrap";
const Login = () => {
  const [isOpen,setIsOpen]= useState(false)
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  let navigate=useNavigate()

const doctorLog=()=>{
  setIsOpen(true)
}
const handleDoctorLog=()=>{
  fetch("http://localhost:4000/loginDoctor",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      doctorId: userId,
      password:password
    }),
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    if(data.error){
      console.log(data.error)
    }
    else{
      navigate("/home")
    }
  })
  .catch(error=>{console.log(error)})
}



  return (
    <Container fluid className="body">
    <Container className="boxAll">
      <Container className="containerName">
        <Row>
          <p className="Title">e-Karton</p>
        </Row>
      </Container>
      <Container className="containerLog">
        <Col xs={10} lg={6}>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="">
                UserId
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="UserId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Row>
              <Col sm={8} />
              <Col sm={4} className="buttonLog">
                <Button variant="primary" onClick={handleDoctorLog}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
      </Container>
    </Container>
  );
};
export default Login;
