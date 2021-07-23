import React, { useContext, useState, useEffect } from 'react'
import { appContext } from '../../context/appContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
function Login() {

    const [user, setUser] = useState({})
    const [empty, setEmpty] = useState(true)


    const [valEmail, setvalEmail] = useState(true);


    const { setUserOk, setLogin, Login } = useContext(appContext)

    const onChangeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    let history = useHistory();

    const sendLogin = async () => {
        let countchecks = 0;
        if (user) {
            for (const key in user) {
                let countchecks = 0;
                switch (key) {
                    case 'password':
                        countchecks++;
                        break;
                    case 'email':
                        setvalEmail(true)
                        countchecks++
                        break;
                    default:
                        break;
                }
            }
            setEmpty(false)
        }
        else {
            setEmpty(true)
        }
        if (countchecks === 2) {
            let respuesta = await axios.post('/Login', user)

            if (respuesta.status === 201) {
                setUserOk(respuesta.data.user)
                setLogin(true)
            }
        }
    }
    useEffect(() => {

        if (Login) history.push('/search')

    }, [Login])

    return (
        <form >
            <input type="text" name='email' placeholder='Introduce el correo electronico' onChange={onChangeInput} />
            <input type="text" name='password' placeholder='Introduce contraseña' onChange={onChangeInput} />
            {empty ? <p>Rellena los campos</p> : <></>}
            <button onClick={sendLogin}>Enviar</button>
        </form>
    )
}

export default Login
