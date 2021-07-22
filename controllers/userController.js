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
                    res.status(201).json({ message: "Usuario creado correctamente", response })

                } catch (error) {
                    res.status(404).json({ message: "error al crear el usuario" })
                }
            } else {
                res.status(302).json({ message: "el usuario ya existe" })
            }

        } else {
            res.status(205).json({ message: "Las contraseña no coinciden" })
        }
    },

    loginUser: async ({ body }, res) => {

        const { password, email } = body;

        try {

            let encryptPass = SHA256(password)
            let response = await User.getUser([email, JSON.stringify(encryptPass.words)])
            if (response[0].c === 1) {
                const token = jwt.sign({ email, nombre: response[0].nombre }, process.env.SECRET_KEY)
                res.cookie('token', token, { httpOnly: true })
                res.status(200).json({ message: "bienvenido user" })
            } else {
                res.status(401).json({ message: "password o usuario incorrecto" })
            }
        } catch (error) {
            res.status(404).json({ message: "error al intentar el login" })
        }
    },

    getDataReviews: async ({body,user}, res) => {

        console.log(`req.body`, body)
        try {
            let response = await User.getReviews(body)
            res.status(200).json({ message: "reviews encontradas", response })
        } catch (error) {
            res.status(404).json({ message: "error en el servidor" })
        }
    },

    uploadpage: (req, res) => {
        console.log(`req.user`, req.user)
        res.status(200).json(req.user)
    }



}
module.exports = userController;