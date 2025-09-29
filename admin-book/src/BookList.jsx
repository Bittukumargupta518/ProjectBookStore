import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
const apiUrl = import.meta.env.VITE_API_URL;
function BookList() {
    let navigate = useNavigate()
    const [show, setShow] = useState(false);
    let [books, setBooks] = useState([])
    let [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        axios({
            // url: 'http://localhost:3000/books',
            url: apiUrl + '/books',
            method: 'get'
        }).then((result) => {
            if (result.data.success) {
                console.log(result.data.data)
                setBooks(result.data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [isDelete])

    function goToAddBookPage() {
        navigate('/add/book')
    }


    const handleClose = () => {
        setShow(false)
        setIsDelete(true)

    };

    function goToDelete(id) {
        axios({
            url: 'http://localhost:3000/delete/book/' + id,
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
        navigate('/edit/book/' + id)
    }
    return (
        <>
            <button className="btn btn-success ms-3 mt-3" onClick={goToAddBookPage}>Add Book+</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Book Image</th>
                        <th> Book Title</th>
                        <th>Author Name</th>
                        <th>Publisher Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book) =>
                            <tr>
                                <td><img src={book.image} width="40px" height="40px"></img></td>
                                <td>{book.bookTitle}</td>
                                <td>{book.authorName}</td>
                                <td>{book.publisher}</td>
                                <td>{book.originalPrice}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => goToDelete(book._id)}>delete</button>
                                    <button className="btn btn-primary ms-2" onClick={() => goToEdit(book._id)}>Edit</button>

                                </td>

                            </tr>
                        )
                    }
                </tbody>

            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book has been deleted successfully...</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default BookList