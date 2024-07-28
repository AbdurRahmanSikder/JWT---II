const express = require('express');
const router = express();
const path = require('path');
const multer = require('multer');
router.use(express.json());
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    
        const location = path.join(__dirname, '..', 'uploads', 'images');

        if (!fs.existsSync(location)) {
            try {
                fs.mkdirSync(location, { recursive: true });
                console.log('Directory created:', location);
            } catch (err) {
                console.error('Error creating uploads directory:', err);
                return cb(err); 
            }
        }

        cb(null, location); 
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
}




const upload = multer({ storage , fileFilter: fileFilter});

module.exports = upload;
