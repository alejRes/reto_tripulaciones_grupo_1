import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { appContext } from '../../context/appContext';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Cfull from '../../images/CorazonLleno.svg'
import CEmpty from '../../images/CorazonVacio.svg'
import './Card.css'

function CardReview(props) {

    const history = useHistory()
    const { userOk } = useContext(appContext)
    const [lleno, setLleno] = useState(false)

    const favorites = () => {
        if (userOk.email === 'false') {
            history.push('/')
        }
        setLleno(!lleno)
    }


    return (

        <article role='button' tabIndex='0' className='Card' onKeyPress={() => { props.detail(props.data.Reviewsid) }} onClick={(e) => { props.detail(e, props.data.Reviewsid) }}>
            <section className='entrada3'>
                <p className='avatar3'>{props.data.Username ? props.data.Username[0] : <></>}</p>
                <div className='infouser'>
                    <p>{props.data.Username}</p>
                    <p>{props.data.Tipominusvalia} / {props.data.Gradominusvalia == 33 ? "< 33%" : props.data.Gradominusvalia == 55 ? "33%-66%" : "> 66%"}</p>
                </div>
                <Box className='star' component="fieldset" mb={0} borderColor="transparent">
                    <Rating name="read-only" value={props.data.Puntuacion} precision={0.5} readOnly />
                </Box>
            </section>

            <img className='imgSitio'src={props.data.Foto} alt={`foto de ` + props.data.Nombre}/>
            <section className='footCard'>
                <div>
                    <p className='tamanio'>{props.data.Nombre}</p>
                    <p>{props.data.Direccion}</p>
                </div>
                <button className='btnfav' name='btnfav' onClick={() => favorites(props.data.Reviewsid)} onKeyPress={() => { props.detail(props.data.Reviewsid) }}>
                    {lleno ? <img src={Cfull} alt="Corzon lleno" name='imgfav' onClick={() => favorites(props.data.Reviewsid)} onKeyPress={() => { props.detail(props.data.Reviewsid) }} /> : <img src={CEmpty} alt="Corzon vacio" name='imgfav' onClick={() => favorites(props.data.Reviewsid)} onKeyPress={() => { props.detail(props.data.Reviewsid) }} />}
                </button>
            </section>

        </article>

    )
}

export default CardReview
