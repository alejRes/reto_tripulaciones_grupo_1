//importacion paquetes necesarios
const jwt = require('jsonwebtoken')
const SHA256 = require('crypto-js/sha256')

const User = require('../models/db');


const userController = {

    registerUser: async ({ body }, res) => {

        const { password, passwordConfirmation, email, username } = body
        let userdatabase = await User.checkUser(email)

        if (password === passwordConfirmation) {
            if (userdatabase[0].num === 0) {
                let encryptPass = SHA256(password)

                try {
                    let response = await User.insertUser([JSON.stringify(encryptPass.words), email, username])

                    const token = jwt.sign({ email, username }, process.env.SECRET_KEY)
                    console.log(`token`, token)
                    res.cookie('token', token, { httpOnly: true })
                    res.status(201).json({ message: "Usuario creado correctamente", response, user: { email, username } })

                } catch (error) {
                    res.status(404).json({ message: "error al crear el usuario" })
                }
            } else {
                res.status(203).json({ message: "el usuario ya existe" })
            }

        } else {
            res.status(205).json({ message: "Las contraseña no coinciden" })
        }
    },

    loginUser: async ({ body }, res) => {

        const { password, email } = body;
        console.log(`body`, body)
        try {

            let encryptPass = SHA256(password)
            let response = await User.getUser([email, JSON.stringify(encryptPass.words)])
            if (response[0].c === 1) {
                const token = jwt.sign({ email }, process.env.SECRET_KEY)
                res.cookie('token', token, { httpOnly: true })
                res.status(200).json({ message: "bienvenido user", user: { email } })
            } else {
                res.status(203).json({ message: "password o usuario incorrecto" })
            }
        } catch (error) {
            res.status(404).json({ message: "error al intentar el login" })
        }
    },

    getDataReviews: async ({ body }, res) => {
        let cadenaSitio = ''
        let objaux = {}
        console.log(`req.body`, body)
        for (const key in body) {
            if (key === 'nombre') {
                if (body[key].length > 0)
                    objaux = { ...objaux, nombre: body[key] }
            }
            if (key === 'tipodiscapacidad') {
                if (body[key].length > 0)
                    objaux = { ...objaux, tipodiscapacidad: body[key] }
            }
            if (key === 'gradodiscapacidad') {
                if (body[key].length > 0)
                    objaux = { ...objaux, gradodiscapacidad: body[key] }
            }
            if (key === 'tipositio') {
                if (body[key].length >= 1) {
                    body[key].forEach(elem => {
                        cadenaSitio.length == 0 ? cadenaSitio = elem : cadenaSitio = cadenaSitio + `|${elem}`
                    })
                    objaux = { ...objaux, tipositio: cadenaSitio }
                }
            }

        }

        console.log(`objaux`, objaux)
        try {
            let response = await User.getReviews(objaux)
            res.status(200).json({ message: "reviews encontradas", response })
        } catch (error) {
            res.status(404).json({ message: "error en el servidor" })
        }
    },

    uploadpage: (req, res) => {
        console.log(`req.user`, req.user)
        res.status(200).json(req.user)
    },

    getPlaces: async (req, res) => {

        try {
            let response = await User.getPlaces()
            res.status(200).json(response)
        } catch (error) {

        }
    },

    insertReview:  async(req, res)=>{

        console.log(`req.body`, req.body)

        const {nombreSitio, tipoDiscapacidad, gradoDiscapacidad, opinion, huecoPasillo, GiroSillas, Rampas, Escaleras, Ascensores, Parking, BarraBano, Banio, valoracion, email} = req.body;

        let review = [opinion, valoracion, tipoDiscapacidad, gradoDiscapacidad, nombreSitio]

        !huecoPasillo? review.push(0): review.push(1)
        !GiroSillas? review.push(0): review.push(1)
        !Rampas? review.push(0): review.push(1)
        !Escaleras? review.push(0): review.push(1)
        !Ascensores? review.push(0): review.push(1)
        !Parking? review.push(0): review.push(1)
        !BarraBano? review.push(0): review.push(1)
        !Banio? review.push(0): review.push(1)

        review = [...review, email]

        console.log(`review`, review)
        try {
            
            let response = await User.insertReview(review)
            res.status(200).json({response, message:"Opinion envia con exito"})

        } catch (error) {
            
        }
        
    }



}
module.exports = userController;