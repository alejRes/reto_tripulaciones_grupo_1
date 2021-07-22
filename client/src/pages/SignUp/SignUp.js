import React, { useState, useEffect } from 'react'

function SingUp() {
    const [user, setUser] = useState({})
    const [valName, setvalName] = useState(true);
    const [valPass, setvalPass] = useState(true);
    const [valEmail, setvalEmail] = useState(true);
    const [valCompare, setvalCompare] = useState(true);


    let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let regexPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/

    const onChangeInput = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    const sendSignUp = (e) => {
        let countchecks = 0;
        e.preventDefault()

        /* for (const key in user) {
        } */

        if (user.username && user.username.length > 5) {
            setvalName(true)
            countchecks++;
        } else {
            setvalName(false)
        }
        if (regexEmail.test(user.email)){
            setvalEmail(true)
            countchecks++;
        } else {
            setvalEmail(false)
        }
        if (user.password === user.passwordConfirmation){
            if(regexPass.test(user.password)){
                setvalPass(true)
            }else{
                setvalPass(false)
            }
            setvalCompare(true)
            countchecks++;
        } else {
            setvalCompare(false)
        }
        if(countchecks===4){
            console.log(`registro enviado`)
        }
        
    }



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

                <button value="Enviar" onClick={sendSignUp} onKeyPress={sendSignUp}>Enviar</button>
            </form>
        </>
    )
}

export default SingUp
