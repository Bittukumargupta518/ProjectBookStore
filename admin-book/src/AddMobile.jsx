import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddMobile() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate("/");
  };

  let [buttonDisabled, setButtonDisabled] = useState(false);

  //  Mobile attributes
  let [mobileName, setMobileName] = useState("");
  let [brand, setBrand] = useState("");
  let [model, setModel] = useState("");
  let [description, setDescription] = useState("");
  let [os, setOs] = useState("Android");
  let [ram, setRam] = useState(4);
  let [storage, setStorage] = useState(64);
  let [battery, setBattery] = useState(4000);
  let [price, setPrice] = useState(0);
  let [color, setColor] = useState("");
  let [warranty, setWarranty] = useState("1 Year");
  let [is5G, setIs5G] = useState(false);
  let [releaseYear, setReleaseYear] = useState(2023);
  let [weight, setWeight] = useState(0);
  let [camera, setCamera] = useState("");     
  let [processor, setProcessor] = useState(""); 
  let [file, setFile] = useState();

  function doAddMobile() {
    setButtonDisabled(true);

    let formData = new FormData();
    formData.append("mobileName", mobileName);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("description", description);
    formData.append("os", os);
    formData.append("ram", ram);
    formData.append("storage", storage);
    formData.append("battery", battery);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("warranty", warranty);
    formData.append("is5G", is5G);
    formData.append("releaseYear", releaseYear);
    formData.append("weight", weight);
    formData.append("camera", camera);
    formData.append("processor", processor);
    if (file) {
      formData.append("file", file);
      formData.append("fileName", file.name);
    }

    axios({
      url: "http://localhost:3000/add/mobile",
      method: "post",
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          setButtonDisabled(false);
          setShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setButtonDisabled(false);
      });
  }

  return (
    <Container fluid>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Mobile Name" onChange={(e) => setMobileName(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" placeholder="Enter Brand" onChange={(e) => setBrand(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control type="text" placeholder="Enter Model" onChange={(e) => setModel(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>OS</Form.Label>
            <Form.Select onChange={(e) => setOs(e.target.value)}>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
              <option value="Others">Others</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>RAM (GB)</Form.Label>
              <Form.Control type="number" onChange={(e) => setRam(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Storage (GB)</Form.Label>
              <Form.Control type="number" onChange={(e) => setStorage(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Battery (mAh)</Form.Label>
              <Form.Control type="number" onChange={(e) => setBattery(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control type="number" onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Camera (e.g. 108MP + 12MP)</Form.Label>
              <Form.Control type="text" placeholder="Enter Camera Details" onChange={(e) => setCamera(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Processor (e.g. Snapdragon 8 Gen 2)</Form.Label>
              <Form.Control type="text" placeholder="Enter Processor" onChange={(e) => setProcessor(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" placeholder="Enter Color" onChange={(e) => setColor(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>5G Supported</Form.Label>
            <Form.Select onChange={(e) => setIs5G(e.target.value === "true")}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </Form.Select>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Warranty</Form.Label>
              <Form.Control type="text" placeholder="e.g. 1 Year" onChange={(e) => setWarranty(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Release Year</Form.Label>
              <Form.Control type="number" onChange={(e) => setReleaseYear(e.target.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Weight (grams)</Form.Label>
              <Form.Control type="number" onChange={(e) => setWeight(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Select Mobile Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="danger">Cancel</Button>
        <Button className="ms-3" variant="success" disabled={buttonDisabled} onClick={doAddMobile}>
          Add Mobile
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Mobile has been saved successfully...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AddMobile;
