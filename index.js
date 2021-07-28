//importaciones necesrias

const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
var cookieParser = require('cookie-parser')

//importacion de rutas

const routerUser = require('./routes/routerUser')


//inicializacion del servidor

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routerUser)

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})



