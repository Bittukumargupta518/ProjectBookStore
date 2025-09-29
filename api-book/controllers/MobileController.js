const Mobile = require('../models/Mobile');
const cloudinary = require("cloudinary").v2;

// 📌 Add new mobile
async function addMobile(req, res) {
    try {
        let upload;

        // if file uploaded, push it to cloudinary
        if (req.file) {
            cloudinary.config({
                cloud_name: "dtnj3vjad",
                api_key: "836243925894637",
                api_secret: "z0rnS46iWj8QmEKtGeux95BLEpo",
            });
            upload = await cloudinary.uploader.upload(req.file.path);
        }

        let mobile = new Mobile(req.body);

        // if upload successful, save Cloudinary URL
        if (req.file && upload) {
            mobile.image = upload.secure_url;
        }

        await mobile.save();

        res.status(200).send({ success: true, message: 'Mobile saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: 'Something went wrong...' });
    }
}

// 📌 Get all mobiles
async function getMobiles(req, res) {
    try {
        let mobiles = await Mobile.find({});
        res.status(200).send({ success: true, data: mobiles });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Something went wrong' });
    }
}

// 📌 Get single mobile
async function getMobile(req, res) {
    try {
        let mobileId = req.params.id;
        let mobile = await Mobile.findOne({ _id: mobileId });

        if (!mobile) {
            return res.status(404).send({ success: false, message: "Mobile not found" });
        }

        res.status(200).send({ success: true, data: mobile });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Something went wrong' });
    }
}

// 📌 Edit mobile
async function editMobile(req, res) {
    try {
        let mobileId = req.params.id;
        let mobile = await Mobile.findOne({ _id: mobileId });

        if (!mobile) {
            return res.status(404).send({ success: false, message: "Mobile not found" });
        }

        // if new image uploaded, update via Cloudinary
        if (req.file) {
            cloudinary.config({
                cloud_name: "dtnj3vjad",
                api_key: "836243925894637",
                api_secret: "z0rnS46iWj8QmEKtGeux95BLEpo",
            });
            let upload = await cloudinary.uploader.upload(req.file.path);
            mobile.image = upload.secure_url;
        }

        Object.assign(mobile, req.body);
        await mobile.save();

        res.status(200).send({ success: true, message: "Mobile updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: "Something went wrong" });
    }
}

// 📌 Delete mobile
async function deleteMobile(req, res) {
    try {
        let mobileId = req.params.id;
        await Mobile.deleteOne({ _id: mobileId });

        res.status(200).send({ success: true, message: 'Mobile deleted.' });
    } catch (err) {
        res.status(500).send({ success: false, message: 'Something went wrong..' });
    }
}

module.exports = {
    addMobile,
    getMobiles,
    getMobile,
    editMobile,
    deleteMobile
};
