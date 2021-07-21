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
            result={error: true, message:"Error de conexion"}

        }finally{
            if(conn)
                conn.end();
        }
        
    }, 
    checkUser: async(email)=>{
        let conn, result;

        try {

            conn = await pool.getConnection();
            let query = `SELECT count(email) as num  FROM usuarios WHERE email = ?`
            result = await conn.query(query,[email])
            
        } catch (error) {
            result={error: true, message:"Error de conexion"}
        }finally{
            if(conn)
                conn.end();
        }
        return result
    },

    getUser: async (userlogin)=>{

        let conn, result;

        try {

            conn = await pool.getConnection();
            let query = `SELECT *, count(nombre) as c FROM usuarios WHERE email = ? and password = ?`
            result = await conn.query(query,userlogin)
        
            
        } catch (error) {
            result={error: true, message:"Error de conexion"}
        }finally{
            if(conn)
                conn.end();
        }
        return result
    }, 
    getReviews: async()=>{
        
        let conn, result;

        try {

            conn = await pool.getConnection();
            let query = ``
            result = await conn.query(query)
        
            
        } catch (error) {
            result={error: true, message:"Error de conexion"}
        }finally{
            if(conn)
                conn.end();
        }
        return result

    }
}

module.exports=User;