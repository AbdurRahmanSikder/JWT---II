const { check } = require('express-validator');

exports.registerValidator = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('password', 'pass must be greater or equal len 6 and contains at least one Upper one Lower one special character one number').isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    check('image').custom((value, { req }) => {
        if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
            return true;
        }
        else return false;
    }).withMessage("please upload an image jpeg and png")
]


exports.isMailValid = [
    check('email', 'please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    })
]


exports.loginVaildator = [
    check('email', 'please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    
    check('password', 'pass must be greater or equal len 6 and contains at least one Upper one Lower one special character one number').isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
]