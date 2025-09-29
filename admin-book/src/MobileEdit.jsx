import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const apiUrl = import.meta.env.VITE_API_URL;

function MobileEdit() {
  let navigate = useNavigate();
  let params = useParams();

  const [mobile, setMobile] = useState({});
  const [file, setFile] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/mobiles");
  };

  function handleChange(e) {
        let name = e.target.name
        let value = e.target.value
        setMobile((prev)=>{
            return{
                ...prev,[name]: value

            }

        })
  }

  
  function doEditMobile(id) {
    axios({
        url:apiUrl + '/edit/mobile/'+ id,
        method: 'put',
        data: book
       }).then((result)=>{

        if(result.data.success){
            setShow(true)
        }

       })
  }
  useEffect(() => {
    axios({
            url: apiUrl + '/mobile/' + params.id,
            method: 'get'
            
        }).then((result) => {
            setMobile(result.data.data)
        }).catch((err) => {

        })

    }, [params])

  return (
    <Container fluid>
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Name</Form.Label>
              <Form.Control
                type="text"
                name="mobileName"
                value={mobile.mobileName || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={mobile.brand || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                name="model"
                value={mobile.model || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={mobile.price || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={mobile.description || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>OS</Form.Label>
              <Form.Select
                name="os"
                value={mobile.os || "Android"}
                onChange={handleChange}
              >
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
                <option value="Windows">Windows</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Warranty</Form.Label>
              <Form.Control
                type="text"
                name="warranty"
                value={mobile.warranty || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>RAM (GB)</Form.Label>
              <Form.Control
                type="number"
                name="ram"
                value={mobile.ram || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Storage (GB)</Form.Label>
              <Form.Control
                type="number"
                name="storage"
                value={mobile.storage || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Battery (mAh)</Form.Label>
              <Form.Control
                type="number"
                name="battery"
                value={mobile.battery || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Weight (g)</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={mobile.weight || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Camera</Form.Label>
              <Form.Control
                type="text"
                name="camera"
                value={mobile.camera || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Processor</Form.Label>
              <Form.Control
                type="text"
                name="processor"
                value={mobile.processor || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="5G Supported"
                name="is5G"
                checked={mobile.is5G || false}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Release Year</Form.Label>
              <Form.Control
                type="number"
                name="releaseYear"
                value={mobile.releaseYear || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Form.Group>
          </Col>
          <Col>
            {mobile.image && (
              <img
                src={file ? URL.createObjectURL(file) : mobile.image}
                alt="Mobile"
                width="150"
                height="150"
              />
            )}
          </Col>
        </Row>

        <Button variant="danger" onClick={() => navigate("/mobiles")}>
          Cancel
        </Button>
        <Button
          className="ms-2"
          variant="success"
          onClick={() => doEditMobile(mobile._id)}
        >
          Edit Mobile
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Mobile has been updated successfully...</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MobileEdit;
