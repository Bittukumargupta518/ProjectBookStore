const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const router = express.Router();

const MobileController = require('../controllers/MobileController');
const Mobile = require('../models/Mobile');

// Middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// File uploader (10 MB limit, store locally)
const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 10 * 1024 * 1024 },
});

// 📌 Add Mobile
router.post('/add/mobile', uploader.single("file"), (req, res) => {
  MobileController.addMobile(req, res);
});

// 📌 Get All Mobiles
router.get('/mobiles', (req, res) => {
  MobileController.getMobiles(req, res);
});

// 📌 Get Mobile by ID
router.get('/mobile/:id', (req, res) => {
  MobileController.getMobile(req, res);
});

// 📌 Update Mobile by ID
router.put('/edit/mobile/:id', uploader.single("file"), (req, res) => {
  MobileController.editMobile(req, res);
});

// 📌 Delete Mobile by ID
router.delete('/delete/mobile/:id', (req, res) => {
  MobileController.deleteMobile(req, res);
});

module.exports = router;
