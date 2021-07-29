import React, {useEffect, useContext} from 'react'
import { appContext } from "../../context/appContext";
import { useHistory } from "react-router";
import Favorito from '../../images/favoritos.png'
import './Favorite.css'
function Favorite() {
    
    const { userOk } = useContext(appContext)
    let history = useHistory()

    useEffect(() => {
    
        if (userOk.email === "false") {

            history.push('/')

        }

    }, [])

    return (
        <div>
            <img className='imgfavoritos' src={Favorito}/>
        </div>
    )
}

export default Favorite
