const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');
router.use(express.json());
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const location = path.join(__dirname, '..', 'uploads', 'images');

        // Check if the directory exists, and create it if it doesn't
        if (!fs.existsSync(location)) {
            try {
                fs.mkdirSync(location, { recursive: true });
                console.log('Directory created:', location);
            } catch (err) {
                console.error('Error creating uploads directory:', err);
                return cb(err); // Pass error to the callback
            }
        }

        cb(null, location); // Use the absolute path
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage });

module.exports = upload;
