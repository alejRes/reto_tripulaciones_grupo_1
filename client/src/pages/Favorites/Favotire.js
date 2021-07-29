import React from 'react'
import Favorito from '../../images/favoritos.png'
function Favotire() {

    useEffect(() => {
    
        if (userOk.email === "false") {

            history.push('/')

        }

    }, [])
    return (
        <div>
            <img src={Favorito}/>
        </div>
    )
}

export default Favotire
