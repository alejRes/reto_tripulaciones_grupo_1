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

        let conn, result;

        try {

            conn = await pool.getConnection();
            let query = `SELECT *, count(Username) as c FROM USER WHERE Email = ? and Password = ?`
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

        let baseQuery = `SELECT r.Reviewsid,r.Tipominusvalia,r.Gradominusvalia,r.Puntuacion,r.Opinion,p.Nombre,p.direccion,p.Sitioweb,p.descripcion,u.username FROM REVIEWS as r INNER JOIN PLACES as p ON r.Nombre = p.Nombre INNER JOIN USER as u ON r.Userid=u.Userid WHERE`;

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

    }
}

module.exports = User;