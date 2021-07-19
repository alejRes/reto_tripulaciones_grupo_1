//importacion paquetes necesarios
const bcrypt = require('bcrypt')

// const User = require ('');


const userController = {

    registerUser: async ({body}, res) =>{

        const{password, passwordConfirmation, email, username}= body

        if (password === passwordConfirmation){
            
            let encryptPass = bcrypt.hashSync(password,10)
            console.log(`encryptPass`, encryptPass)
        }else{

        }

    }

}

module.exports = userController;