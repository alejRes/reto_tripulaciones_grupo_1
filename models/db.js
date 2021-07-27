const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 5
})

const User = {

    insertUser: async (user) => {
        let conn, result;
        try {
            conn = await pool.getConnection();
            let query = `INSERT into USER (Password, Email , Username) values (?,?,?)`
            result = await conn.query(query, user)

        } catch (error) {
            result = { error: true, message: "Error de conexion", error }

        } finally {
            if (conn)
                conn.end();
        }
        return result

    },
    checkUser: async (email) => {
        let conn, result;

        try {

            conn = await pool.getConnection();
            let query = `SELECT count(Email) as num  FROM USER WHERE Email = ?`
            result = await conn.query(query, [email])

        } catch (error) {
            result = { error: true, message: "Error de conexion" }
        } finally {
            if (conn)
                conn.end();
        }
        return result
    },

    getUser: async (userlogin) => {
        console.log(`userlogin`, userlogin)
        let conn, result;

        try {

            conn = await pool.getConnection();
            let query = `SELECT count(Username) as c, Email FROM USER WHERE Email = ? and Password = ?`
            result = await conn.query(query, userlogin)

        } catch (error) {
            result = { error: true, message: "Error de conexion" }
        } finally {
            if (conn)
                conn.end();
        }
        return result
    },

    getPlaces: async () => {
        let conn, result

        try {
            conn = await pool.getConnection()
            let query = 'SELECT Nombre FROM PLACES'
            result = await conn.query(query)
        } catch (error) {

        } finally {
            if (conn)
                conn.end();
        }
        return result
    },

    getReviews: async (filter) => {

        let conn, result;

        let arrayValues = [];

        let baseQuery = `SELECT r.Reviewsid,r.Tipominusvalia,r.Gradominusvalia,r.Puntuacion, p.Nombre, p.Direccion, p.Foto, u.username FROM REVIEWS as r INNER JOIN PLACES as p ON r.Nombre = p.Nombre INNER JOIN USER as u ON r.Userid=u.Userid WHERE`;

        // for que extrae las keys del objeto para comprarlas y poder extraer los valores de un objeto y 
        for (const key in filter) {

            switch (baseQuery.slice(-1)) {
                case 'E':
                    if (key === 'nombre') {
                        baseQuery += ` p.Nombre REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'tipositio') {
                        baseQuery += ` p.Tipo REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'tipodiscapacidad') {
                        baseQuery += ` r.Tipominusvalia REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'gradodiscapacidad') {
                        baseQuery += ` r.Gradominusvalia REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    break;

                case '?':
                    if (key === 'nombre') {
                        baseQuery += ` and p.Nombre REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'tipositio') {
                        baseQuery += ` and p.Tipo REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'tipodiscapacidad') {
                        baseQuery += ` and r.Tipominusvalia REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'gradodiscapacidad') {
                        baseQuery += ` and r.Gradominusvalia REGEXP ?`;
                        arrayValues.push(filter[key])
                    }

                    break;
            }
        };
        console.log(`baseQuery split`, baseQuery)
        console.log(`arrayValues`, arrayValues)
        try {

            conn = await pool.getConnection();
            result = await conn.query(baseQuery, arrayValues)


        } catch (error) {
            console.log(`error`, error)
            result = { error: true, message: "Error de conexion" }
        } finally {
            if (conn)
                conn.end();
        }
        return result

    },
    insertReview: async (review)=>{
        console.log(`review`, review)
        let conn, result;

        try {
            conn = await pool.getConnection()
            let query = 'INSERT INTO REVIEWS (Opinion, Puntuacion, Tipominusvalia, Gradominusvalia, Nombre, Anchurapuerta, Giropasillo, Rampas, Escaleras, Ascensores, Parking, Barrabaño, Bañoadaptado, Userid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,(SELECT Userid FROM USER WHERE Email = ?))'
            result = await conn.query(query,review)
            
        } catch (error) {
            result = {error}
        }finally{
            if(conn)
                conn.end()
        }
        console.log(`result`, result)
        return result
    },
    getDetail: async(id) =>{
        let conn, result

        try {
            conn = await pool.getConnection();
            let query = 'SELECT r.*, p.Direccion, p.Foto, u.Username  FROM REVIEWS AS r INNER JOIN PLACES AS p ON r.Nombre=p.Nombre INNER JOIN USER AS u ON r.Userid = u.Userid WHERE r.Reviewsid = ?' 
            result = await conn.query(query,[id])
        } catch (error) {
            result = {error}
        }finally{
            if(conn){
                conn.end()
            }
        }
        console.log(`result`, result)
        return result
    },
     getDetailPlace: async(nombreSitio)=>{
        let conn, result

        try {
            conn = await pool.getConnection();
            let query = 'SELECT * FROM PLACES WHERE Nombre = ?' 
            result = await conn.query(query,[nombreSitio])
        } catch (error) {
            result = {error}
        }finally{
            if(conn){
                conn.end()
            }
        }
        return result;

     }

}

module.exports = User;