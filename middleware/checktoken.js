const jwt = require('jsonwebtoken')

checktoken = (req,res,next)=> {

    console.log(`req`, req.cookies.token)
    // console.log(`jwt`,jwt.verify(req.cookies.token, process.env.SECRET_KEY,))

    
    try {
        const decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        if(decode.email){
            req.user = decode
            next()
        }
    } catch (error) {
        res.status(401).json({message:'token invalido', error})
    }
}

module.exports=checktoken;