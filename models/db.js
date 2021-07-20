const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    connectionLimit: 5
})

const User ={

    insertUser: async (user)=>{
        let conn, result;
        try {
            conn = await pool.getConnection();
            let query = `INSERT into usuarios (password, email , nombre) values (?,?,?)`
            result = await conn.query(query,user)

        } catch (error) {
            

        }
        
    }, 
    checkUser: async(email)=>{
        let conn, result;

        try {

            conn = await pool.getConnection();
            let query = `SELECT email FROM usuarios WHERE email = ?`
            result = await conn.query(query,[email])
            console.log(`result`, result)
            console.log(`query`, query)
            
        } catch (error) {
            
        }
        return result
    },

    getUser: async(user)=>{

        
    }


}

module.exports=User;