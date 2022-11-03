import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  Container,
  Row,
  Col,
  FormControl,
  Form,
  Button,
  Card,
  Image,
} from "react-bootstrap";

import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import {
  faHome,
  faTrash,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";
import "./profileP.css";
import { useCallback } from "react";
import { useRef } from "react";

const Patient = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [dataD, setDataD] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState();

  const [dataDs, setDataDs] = useState([]);
  const [fileData, setFileData] = useState("");
  const [url, setUrl] = useState("");

  const [image, setImage] = useState("");

  const [patientId, setPatientId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [oib, setOib] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");

  let params = useParams();

  const diagnosePhoto = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "diagnose");
    data.append("api_key", 776455138997884);
    data.append("cloud_name", "doecuzy9");

    await fetch("https://api.cloudinary.com/v1_1/doecuzy9/image/upload", {
      method: "POST",
      body: data,
      mode: "cors",
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        setUrl(data.url);
        await fetch(`http://localhost:4000/addDiagnose`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            patientId: params._id,
            media: data.url,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            window.location.reload(true);
            setIsOpen(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddDiagnose = () => {
    setIsOpen(true);
  };
  const Update = () => {
    setIsOpenUpdate(true);
  };

  useEffect(() => {
    fetchPatient();
    //fetchPatientDiagnose();
    fetchDiagnose();
    //handleDelete();
  }, []);

  const fetchPatient = async () => {
    await fetch(`http://localhost:4000/allpatient/?_id=${params._id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(params._id);
        const filterData = data.patients.filter((patient) => {
          return patient._id === params._id;
        });
        console.log(filterData);
        setData(filterData);
        setFullName(filterData.fullName);
        setEmail(filterData.email);
        setOib(filterData.oib);
        setContact(filterData.contact);
        setGender(filterData.gender);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    console.warn(id);
    await fetch(`http://localhost:4000/diagnoseDelete/${id}`, {
      method: "POST",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        window.location.reload(true);
      });
    });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:4000/patientUpdate/${params._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        contact,
        email,
        gender,
        oib,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.result);
        window.location.reload(true);
        setIsOpenUpdate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDiagnose = () => {
    fetch(`http://localhost:4000/patientDiagnose/?_id=${params._id}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(params._id);
        console.log(data.patientDiagnose);
        const filterData = data.patientDiagnose.filter((patientDiagnose) => {
          console.log(params._id);
          return patientDiagnose.patientId === params._id;
        });
        console.log(filterData);
        setDataDs(filterData);
      })
      .catch((err) => console.log(err));
  };

  const fetchPatientDiagnose = () => {
    fetch("http://localhost:4000/patientDiagnose")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setDataD(data);
      })
      .catch((err) => console.log(err));
  };

  const fetchData = async () => {
    await fetch("http://localhost:4000/addDiagnose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        media: url,
        patientId: params._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //window.location.reload(true);
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };
  const handleSignOut = () => {
    navigate("/");
  };

  return (
    <Container fluid className="mainContainer">
      <Row>
        <Container fluid className="navigationBar">
          <FontAwesomeIcon
            icon={faSignOut}
            size="xl"
            onClick={handleSignOut}
            className="card__ikona"
          />

          <FontAwesomeIcon
            icon={faHome}
            size="xl"
            onClick={handleHome}
            className="card__ikona"
          />
        </Container>
      </Row>
      <Row>
        <Col>
          <Container>
            {data.map((item) => {
              return (
                <Container className="podaci" key={item.id}>
                  <p>
                    <b>Ime i prezime: </b>
                    {item.fullName}
                  </p>
                  <b></b>
                  <p>
                    <b>OIB: </b>
                    {item.oib}
                  </p>
                  <b></b>
                  <p>
                    <b>Spol: </b>
                    {item.gender}
                  </p>
                  <b></b>
                  <p>
                    <b>E-mail: </b>
                    {item.email}
                  </p>
                  <b></b>
                  <p>
                    <b>Kontakt broj:</b>
                    {item.contact}
                  </p>
                  <b></b>
                  <FontAwesomeIcon
                    icon={faPenSquare}
                    size="l"
                    className="card__ikona"
                    onClick={Update}
                  />
                </Container>
              );
            })}
          </Container>
        </Col>
        <Col>
          <Container>
            <br></br>
            <Button variant="primary" onClick={handleAddDiagnose}>
              Dodaj dijagnozu
            </Button>
            {dataDs.length > 0 ? (
              dataDs.map((item) => {
                return (
                  <Container className="data" key={item.patientID}>
                    <br></br>
                    <Card border="primary" className="card">
                      <p>{item.name} </p>
                      <Image
                        src={item.media}
                        alt={"diagnoseFoto"}
                        style={{ width: "100px", height: "100px" }}
                      />
                      <p>
                        {item.description}
                        <br></br>
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="l"
                          onClick={() => handleDelete(item._id)}
                          className="card__ikona"
                        />
                      </p>
                    </Card>
                  </Container>
                );
              })
            ) : (
              <Container>
                <br></br>
                <p>This patient does not have diagnose</p>
              </Container>
            )}
          </Container>
        </Col>
      </Row>

      <Row>
        <Modal show={isOpen} onHide={() => setIsOpen(false)} className="unos">
          <Modal.Header closeButton>
            <Modal.Title>Unos Dijagnoze</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Naziv dijagnoze</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Naziv Dijagnoze"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mediji</Form.Label>

                <Form.Control
                  type="file"
                  /* placeholder="Dodajte medije..." */
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Opis</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder=""
                  rows={3}
                  autoFocus
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={diagnosePhoto}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>

      <Row>
        <Col>
          <Container>
            {data.map((item) => {
              return (
                <Modal
                  show={isOpenUpdate}
                  onHide={() => setIsOpenUpdate(false)}
                  className="unos"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Edit pacijenta</Modal.Title>
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
                          value={item.patientId}
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
                          defaultValue={item.fullName}
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
                          placeholder="OIB"
                          autoFocus
                          defaultValue={item.oib}
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
                          defaultValue={item.gender}
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
                          defaultValue={item.email}
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
                          defaultValue={item.contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setIsOpenUpdate(false)}
                    >
                      Close
                    </Button>

                    <Button variant="primary" onClick={handleUpdate}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              );
            })}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default Patient;
