const router = require('express').Router()

// importacion controlador

const userController = require('../controllers/userController')

// rutas para usurios

router.get('/Login', )
router.post('/SingUp', userController.registerUser)

