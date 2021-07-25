const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME,
    connectionLimit: 5
})

const User = {

    insertUser: async (user) => {
        let conn, result;
        try {
            conn = await pool.getConnection();
            let query = `INSERT into usuarios (password, email , nombre) values (?,?,?)`
            result = await conn.query(query, user)

        } catch (error) {
            result = { error: true, message: "Error de conexion" }

        } finally {
            if (conn)
                conn.end();
        }

    },
    checkUser: async (email) => {
        let conn, result;

        try {

            conn = await pool.getConnection();
            let query = `SELECT count(email) as num  FROM usuarios WHERE email = ?`
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
            let query = `SELECT *, count(nombre) as c FROM usuarios WHERE email = ? and password = ?`
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
            let query = 'SELECT nombre FROM places'
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

        let baseQuery = `SELECT r.reviweID,r.tipoDiscapacidad,r.gradoDiscapacidad,r.valoracion,r.opinion,p.nombre,p.direccion,p.web,p.descripcion,u.username FROM reviews as r INNER JOIN places as p ON r.nombre = p.nombre INNER JOIN usuarios as u ON r.userID=u.userID WHERE`;

        // for que extrae las keys del objeto para comprarlas y poder extraer los valores de un objeto y 
        for (const key in filter) {

            switch (baseQuery.slice(-1)) {
                case 'E':
                    if (key === 'nombre') {
                        baseQuery += ` p.nombre REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'tipositio') {
                        baseQuery += ` p.tipo REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'tipodiscapacidad') {
                        baseQuery += ` r.tipoDiscapacidad REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'gradodiscapacidad') {
                        baseQuery += ` r.gradoDiscapacidad REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    break;

                case '?':
                    if (key === 'nombre') {
                        baseQuery += ` and p.namePlace REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'tipositio') {
                        baseQuery += ` and p.tipo REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'tipodiscapacidad') {
                        baseQuery += ` and r.tipoDiscapacidad REGEXP ?`;
                        arrayValues.push(filter[key])
                    }
                    else if (key === 'gradodiscapacidad') {
                        baseQuery += ` and r.gradoDiscapacidad REGEXP ?`;
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