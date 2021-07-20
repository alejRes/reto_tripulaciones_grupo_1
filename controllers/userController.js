//importacion paquetes necesarios

const AES = require('crypto-js/sha256')

const User = require('../models/db');


const userController = {

    registerUser: async ({ body }, res) => {

        const { password, passwordConfirmation, email, username } = body
        let userdatabase = await User.checkUser(email)
        console.log(`userdatabase`, userdatabase[0])
        if (password === passwordConfirmation) {
            if (userdatabase[0] === undefined/*  || userdatabase[0].email != email */)  {
                let encryptPass = AES(password)
                try {
                    let response = await User.insertUser([encryptPass, email, username])
                    res.status(201).json({ message: "Usuario creado correctamente", response })
                } catch (error) {
                    res.status(404).json({ message: "error al crear el usuario" })
                }
            }else{
                res.status(302).json({message: "el usuario ya existe"})
            }

        } else {
            res.status(205).json({ message: "Las contraseñas no coinciden" })
        }
    }

    
}

module.exports = userController;