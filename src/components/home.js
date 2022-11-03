import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  FormControl,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { faPerson, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import "./home.css";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [oib, setOib] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [allPatientData, setAllPatinetData] = useState([]);
  const [search, setSearch] = useState("");

  const AddPatient = () => {
    setIsOpen(true);
  };
  const Search = () => {
    setIsOpenSearch(true);
  };

  const handleAddPatient = () => {
    fetch("http://localhost:4000/addpatient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        oib: oib,
        contact: contact,
        gender: gender,
        email: email,
        patientId: patientId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsOpen(false);
        setPatientId("");
        setFullName("");
        setOib("");
        setGender("");
        setContact("");
        setEmail("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:4000/allpatient")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllPatinetData(data.patients);
      });
  }, []);
  console.log(allPatientData.length);

  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Container fluid className="homeTab">
      <Row className="red">
        <Col className="stupac">
          <Card border="primary" className="card">
            <Card.Header>Pretraživanje</Card.Header>
            <Card.Body className="kartica">
              <Card.Title>Pretražite pacijente</Card.Title>
              <Card.Text>
                <FontAwesomeIcon
                  icon={faBookMedical}
                  size="6x"
                  onClick={Search}
                  className="card__ikona"
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <br />
        <Col className="stupac">
          <Card border="secondary" className="card">
            <Card.Header>Novi Pacijent</Card.Header>
            <Card.Body className="kartica">
              <Card.Title>Dodajte novog pacijenta</Card.Title>
              <Card.Text>
                <FontAwesomeIcon
                  icon={faPerson}
                  size="6x"
                  onClick={AddPatient}
                  className="card__ikona"
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <br />
        <Col className="stupac">
          <Card border="success" className="card">
            <Card.Header>Odjava</Card.Header>
            <Card.Body className="kartica">
              <Card.Title>Odjavi se </Card.Title>
              <Card.Text>
                <FontAwesomeIcon
                  icon={faSignOut}
                  size="6x"
                  onClick={handleClick}
                  className="card__ikona"
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <br />
      </Row>
      <Row>
        <Modal show={isOpen} onHide={() => setIsOpen(false)} className="unos">
          <Modal.Header closeButton>
            <Modal.Title>Unos pacijenta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>PacijentID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ID"
                  autoFocus
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Ime i prezime</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ime i prezime"
                  autoFocus
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>OIB</Form.Label>
                <Form.Control
                  type="text"
                  minLength={11}
                  placeholder="OIB"
                  autoFocus
                  value={oib}
                  onChange={(e) => setOib(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Spol</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Spol"
                  autoFocus
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Kontakt</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kontakt"
                  autoFocus
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Napomena</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddPatient}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Modal show={isOpenSearch} onHide={() => setIsOpenSearch(false)}>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline-success" className="butt">
            Search
          </Button>
        </Form>
        <Container className="search">
          {allPatientData.length < 1 ? (
            <p className="desc">No patient found</p>
          ) : (
            allPatientData
              .filter((pat) => {
                if (search == "") {
                  return pat;
                } else if (
                  pat.fullName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return pat;
                }
              })
              .map((item) => {
                return (
                  <p className="desc" key={item._id}>
                    <Link to={`/profileP/${item._id}`}>{item.fullName}</Link>
                  </p>
                );
              })
          )}
        </Container>
      </Modal>
    </Container>
  );
};
export default Home;
