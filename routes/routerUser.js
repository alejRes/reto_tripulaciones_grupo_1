const router = require('express').Router()

//importacion middleware

const checktoken = require('../middleware/checktoken')

// importacion controlador

const userController = require('../controllers/userController')

// rutas para usurios

// router.get('/Login', )
router.post('/SingUp', userController.registerUser)
router.post('/Login', userController.loginUser)
router.post('/Reviews', userController.getDataReviews)
router.get('/getNamePlaces', userController.getPlaces)
router.post('/insertReview', userController.insertReview)
// router.get('/Search',userController.uploadpage)

module.exports=router