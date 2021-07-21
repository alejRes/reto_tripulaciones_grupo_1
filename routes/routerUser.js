const router = require('express').Router()

// importacion controlador

const userController = require('../controllers/userController')

// rutas para usurios

// router.get('/Login', )
router.post('/SingUp', userController.registerUser)
router.post('/Login', userController.loginUser)
// router.get('/Search',checkCookie, userController.getDataUser)

module.exports=router