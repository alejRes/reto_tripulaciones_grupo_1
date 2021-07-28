import React, { useContext, useState, useEffect } from 'react'
import { appContext } from '../../context/appContext'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
function SingUp() {
    const [user, setUser] = useState({})
    const [valName, setvalName] = useState(true);
    const [valPass, setvalPass] = useState(true);
    const [valEmail, setvalEmail] = useState(true);
    const [valCompare, setvalCompare] = useState(true);
    const [empty, setEmpty] = useState(true)

    const{setUserOk, setLogin, login} = useContext(appContext)


    let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let regexPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/
    let history = useHistory()
    const onChangeInput = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    const sendSignUp = async(e) => {
        let countchecks = 0;
        e.preventDefault()
        if(user){
        
            for (const key in user) {
    
                switch (key) {
                    case 'username':
                        if (user[key] && user[key].length > 5) {
                            setvalName(true)
                            countchecks++;
                        } else {
                            setvalName(false)
                        }
                        break;
                    case 'password':
                        if (user[key] === user.passwordConfirmation) {

                            if (regexPass.test(user[key])) {
                                setvalPass(true)
                                countchecks++;
                            } else {
                                setvalPass(false)
                            }
                            setvalCompare(true)
                        } else {
                            setvalCompare(false)
                        }
                        break;
                    case 'email':
                        if (regexEmail.test(user[key])) {
                            setvalEmail(true)
                            countchecks++;
                        } else {
                            setvalEmail(false)
                        }
                        break;
                    default:
                        break;
                }
            }
            setEmpty(false)
        }
        else{
            setEmpty(true)
        }
        if (countchecks === 3) {
            let respuesta = await axios.post('/SingUp',user)
            console.log(`respuesta`, respuesta)
            console.log(`respuesta`, respuesta.status===203)
            if(respuesta.status === 201){
                setUserOk(respuesta.data.user)
                setLogin(true)
            }
        }
    }

    useEffect(() => {
        
        if(login) history.push('/search')

    }, [login])

    return (
        <>
            <form>
                <input type="text" name='username' placeholder='nombre' onChange={onChangeInput}></input>
                {valName ? <></> : <p>el nombre debe tener al menos 5 caracteres</p>}
                <input type="email" name='email' placeholder='email' onChange={onChangeInput}></input>
                {valEmail ? <></> : <p>email no valido</p>}
                <input type="password" name='password' placeholder='password' onChange={onChangeInput}></input>
                <input type="password" name='passwordConfirmation' placeholder='repetir password' onChange={onChangeInput}></input>
                {valCompare ? <></> : <p>Las contraseñas no coinciden</p>}
                {valPass ? <></> : <p>debe tener mayuscula, minuscula, numero y 8-16 caracteres</p>}
                {empty? <p>no se admiten campos vacios</p>: <></> }
                <button value="Enviar" onClick={sendSignUp} onKeyPress={sendSignUp}>Enviar</button>
            </form>
        </>
    )
}

export default SingUp
