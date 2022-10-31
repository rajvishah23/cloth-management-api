const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/userController');
const clothController = require('../controllers/clothController');
const uploadImage = require('../middleware/upload-image');
//const isAuth = require('../middleware/auth');

router.post('/signup', userController.signup);
 
router.post('/login', userController.login);
 
router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);

router.put('/user/:userId', userController.allowIfLoggedin,userController.grantAccess('updateOwn', 'profile'), userController.updateUser);
 
router.get('/users', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'), userController.getUsers);
 
router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

//clothes routes

router.get('/clothes',userController.allowIfLoggedin,userController.grantAccess('readAny', 'cloth'), clothController.getAllClothes);

router.get('/cloth/:clothId',userController.allowIfLoggedin,userController.grantAccess('readOwn', 'cloth'), clothController.getSingleCloth);

router.delete('/cloth/:clothId',userController.allowIfLoggedin,userController.grantAccess('deleteOwn', 'cloth'), clothController.deleteCloth);

router.post('/cloth',userController.allowIfLoggedin, userController.grantAccess('createOwn', 'cloth'),uploadImage,
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter cloth title!'),
        body('price')
            .notEmpty()
            .withMessage("Please enter the clothe's price")
            .isInt()
            .withMessage("Price must be an integer"),
        body('description')
            .trim()
            .notEmpty()
            .withMessage("Please enter the clothe's description")
            .isLength({ min: 15 })
            .withMessage('The description must be at least 15 characters'),
    ],
    clothController.addCloth
);

router.put('/cloth/:clothId',userController.allowIfLoggedin,userController.grantAccess('updateOwn', 'cloth'), uploadImage,
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter cloth title!'),
        body('price')
            .notEmpty()
            .withMessage("Please enter the clothe's price")
            .isInt()
            .withMessage("Price must be an integer"),
        body('description')
            .trim()
            .notEmpty()
            .withMessage("Please enter the clothe's description")
            .isLength({ min: 15 })
            .withMessage('The description must be at least 15 characters'),
    ],
    clothController.updateCloth);

 
module.exports = router;