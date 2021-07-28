import React, { useContext, useState, useEffect } from 'react'
import { appContext } from '../../context/appContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Logo from '../../images/logo.png'
import './Login.css'
function Login() {

    const [user, setUser] = useState({})
    const [empty, setEmpty] = useState(true)
    const [error, setError] = useState(false)


    const [valEmail, setvalEmail] = useState(true);


    const { setUserOk, setLogin, login } = useContext(appContext)

    const onChangeInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    let history = useHistory();

    const sendLogin = async (e) => {
        e.preventDefault()
        let checks = 0;
        if (user) {
            for (const key in user) {

                switch (key) {
                    case 'password':
                        checks++;
                        break;
                    case 'email':
                        setvalEmail(true)
                        checks++
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

        if (checks == 2) {
            let respuesta = await axios.post('/Login', user)
            console.log(`respuesta`, respuesta)
            if (respuesta.status === 200) {
                setUserOk(respuesta.data.user)
                setLogin(true)
            }else{
                setError(true)
            }
        }
    }
    const redirect = () => {

        history.push('/search')

    }
    useEffect(() => {
        const changePage = () => {
            if (login) history.push('/search')
            console.log(`Login`, login)
            
        }
        changePage()

    }, [login])

    const toSignUp =()=>{

        history.push('/signup')

    }

    return (
        <div className='login'>
            <img src={Logo} alt="logo" />
            <form className='login'>
                <input className='inputtext' type="text" name='email' placeholder='Introduce el correo electronico' onChange={onChangeInput} />
                <input className='inputtext' type="password" name='password' placeholder='Introduce contraseña' onChange={onChangeInput} />
                {empty? <p className='aviso'>Introduce usuario y contraseña</p> : <></>}
                
                {error? <p className='aviso'>Usuario o contraseña incorrecto </p>:<></>}
                
                <button className='btnenviar' onClick={sendLogin}>Inicia sesion</button>
                
            </form>
            <button className='btnregistro'id='usuarionuevo'onClick={toSignUp}>¿No tienes cuenta? Registrate</button>
            <button className='btninvitado' id='invitado'onClick={redirect}>Accede como invitado</button>
        </div>
    )
}

export default Login
