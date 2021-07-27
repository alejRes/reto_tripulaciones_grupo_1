import React, {useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Cfull from '../../images/CorazonLleno.svg'
import CEmpty from '../../images/CorazonVacio.svg'

function CardReview(props) {

    const [lleno, setLleno] = useState(false)

    const favorites = () => {
        setLleno(!lleno)
    }

    
    return (
        <article onClick={() => { props.detail(props.data.Reviewsid) }}>
            <p>{props.data.Nombre}</p>
            <p>{props.data.Tipominusvalia}</p>
            <p>{props.data.Gradominusvalia}</p>
            <Box component="fieldset" mb={0} borderColor="transparent">
                <Rating name="read-only" value={props.data.Puntuacion} precision={0.5} readOnly />
            </Box>
            <img src={props.data.Foto} alt={`foto de `+ props.data.Nombre} width="343" height='114'/>
            <p>{props.data.Nombre}</p>
            <p>{props.data.Direccion}</p>
            <button onClick={()=>favorites(props.data.Reviewsid)}>
                {lleno?<img src={Cfull} alt="Corzon lleno"/>:<img src={CEmpty} alt="Corzon vacio"/>}
            </button>
        </article>
    )
}

export default CardReview
