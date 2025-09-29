import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const apiUrl = import.meta.env.VITE_API_URL;

function MobileList() {
    let navigate = useNavigate()
    const [show, setShow] = useState(false);
    let [mobiles, setMobiles] = useState([])
    let [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        axios({
            url: apiUrl + '/mobiles',
            method: 'get'
        }).then((result) => {
            if (result.data.success) {
                console.log(result.data.data)
                setMobiles(result.data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [isDelete])

    function goToAddMobilePage() {
        navigate('/add/mobile')
    }

    const handleClose = () => {
        setShow(false)
        setIsDelete(true)
    };

    function goToDelete(id) {
        axios({
            url: apiUrl + '/delete/mobile/' + id,
            method: 'delete'
        }).then((result) => {
            if (result.data.success) {
                setShow(true)
            }
        }).catch((err) => {
            alert(err)
        })
    }

    function goToEdit(id) {
        navigate('/edit/mobile/' + id)
    }

    return (
        <>
            <button className="btn btn-success ms-3 mt-3" onClick={goToAddMobilePage}>Add Mobile+</button>
            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Mobile Name</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Description</th>
                            <th>OS</th>
                            <th>RAM</th>
                            <th>Storage</th>
                            <th>Battery</th>
                            <th>Price</th>
                            <th>Color</th>
                            <th>Warranty</th>
                            <th>5G Support</th>
                            <th>Release Year</th>
                            <th>Weight</th>
                            <th>Camera</th>
                            <th>Processor</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mobiles.map((mobile) =>
                                <tr key={mobile._id}>
                                    <td>
                                        <img 
                                            src={mobile.image} 
                                            width="50px" 
                                            height="50px" 
                                            alt={mobile.mobileName} 
                                        />
                                    </td>
                                    <td>{mobile.mobileName}</td>
                                    <td>{mobile.brand}</td>
                                    <td>{mobile.model}</td>
                                    <td>{mobile.description}</td>
                                    <td>{mobile.os}</td>
                                    <td>{mobile.ram} GB</td>
                                    <td>{mobile.storage} GB</td>
                                    <td>{mobile.battery} mAh</td>
                                    <td>₹{mobile.price}</td>
                                    <td>{mobile.color}</td>
                                    <td>{mobile.warranty}</td>
                                    <td>{mobile.is5G ? "Yes" : "No"}</td>
                                    <td>{mobile.releaseYear}</td>
                                    <td>{mobile.weight} g</td>
                                    <td>{mobile.camera}</td>
                                    <td>{mobile.processor}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => goToDelete(mobile._id)}>Delete</button>
                                        <button className="btn btn-primary ms-2" onClick={() => goToEdit(mobile._id)}>Edit</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Mobile has been deleted successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MobileList
