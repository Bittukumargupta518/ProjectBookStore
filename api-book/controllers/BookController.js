const Book = require('../models/Book');
const cloudinary = require("cloudinary").v2;
async function addBook(req, res) {
    try {
        let upload;

        if (req.file) {
            cloudinary.config({
                cloud_name: "dtnj3vjad",
                api_key: "836243925894637",
                api_secret: "z0rnS46iWj8QmEKtGeux95BLEpo",
            })
            upload = await cloudinary.uploader.upload(req.file.path);
        }
        let book = new Book(req.body);
        if (req.file && upload) {
            book.image = upload.secure_url;
        }
        await book.save();

        res.status(200).send({ success: true, message: 'Data saved sucessfully' });
    } catch (err) {

        res.status(500).send({ success: false, message: 'Something Went Wrong...' });
    }
}
async function getBooks(req, res) {
    try {
        let books = await Book.find({});

        res.status(200).send({ success: true, data: books });

    } catch (err) {
        res.status(500).send({ success: false, message: 'Something Went wrong' });
    }
}
async function deleteBook(req, res) {
    try {
        let bookId = req.params.id;
        await Book.deleteOne({ _id: bookId });

        res.status(200).send({ success: true, message: 'Book deleted.' })
    } catch (err) {
        res.status(500).send({ success: false, message: 'something went wrong..' });

    }
}
async function getBook(req, res) {
    try {
        let bookId = req.params.id;
        let book = await Book.findOne({ _id: bookId });
        res.status(200).send({ succss: true, data: book })

    } catch (err) {
        res.status(500).send({ succss: false, message: 'something went wrong' });

    }

}
async function editBook(req, res) {
    try {
        let bookId = req.params.id;
        console.log(bookId, 'book id')
        console.log(req.body);
        let book = await Book.findOne({ _id: bookId })
        Object.assign(book, req.body);
        await book.save();
        console.log("Book has been updated sucessfully..")
        res.status(200).send({ success: true, message: "Book has been updated" })
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "something went wrong.." })

    }
}
module.exports = {
    addBook,
    getBooks,
    deleteBook,
    getBook,
    editBook
}