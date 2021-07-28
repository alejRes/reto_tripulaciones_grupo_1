import React, {useState} from 'react'
import './But.css'

function But(props) {
    const [active, setActive] = useState(false)
    const buttonClick =(e)=>{
        props.click(e.target.value, active)
        setActive(!active)
    }
    return (
        <button onClick = {buttonClick} value={props.value} className={!active?'normal':'pulsado'}>{props.value}</button>
    )
}

export default But
