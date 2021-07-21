const router = require('express').Router()

//importacion middleware

const checktoken = require('../middleware/checktoken')

// importacion controlador

const userController = require('../controllers/userController')

// rutas para usurios

// router.get('/Login', )
router.post('/SingUp', userController.registerUser)
router.post('/Login', userController.loginUser)
router.post('/Reviews',checktoken, userController.getDataReviews)
router.get('/Search',checktoken,userController.uploadpage)

module.exports=router