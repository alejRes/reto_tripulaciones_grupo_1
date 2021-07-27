import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { appContext } from '../../context/appContext';
import { useHistory, useParams } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Cfull from '../../images/CorazonLleno.svg'
import CEmpty from '../../images/CorazonVacio.svg'
import TickOk from '../../images/tickOk.svg'
import TickNo from '../../images/tickNo.svg'
import './Detail.css'

function DetailReview() {
    const { id } = useParams()

    const{setIdDetail} = useContext(appContext)

    const [detail, setDetail] = useState({})

    const [lleno, setLleno] = useState(false)

    const favorites = () => {
        setLleno(!lleno)
    }


    let history = useHistory()

    useEffect(() => {
        const getDetail = async () => {
            let response = await axios.post('/getDetail', { id: id })
            setDetail(response.data[0])
        }
        getDetail()
    }, [])

    const changetoSearchReview = () => {
        history.push('/reviews')
    }

    const detailPlace = (nombreSitio) => {
        setIdDetail(detail.Reviewsid)
        history.push(`/detailPlace/${nombreSitio}`)
    }

    const paintDetail = () => {
        const { Anchurapuerta, Giropasillo, Rampas, Escaleras, Ascensores, Parking, Barrabaño, Bañoadaptado } = detail
        return (<div>
            <section>
                <p>{detail.Username ? detail.Username[0] : <></>}</p>
                <p>{detail.Username}</p>
                <p>{detail.Tipominusvalia + "/"}</p>
                <p>{detail.Gradominusvalia == 33 ? "< 33%" : detail.Gradominusvalia == 55 ? "33% - 66%" : "> 66%"}</p>
                <button onClick={changetoSearchReview}>atras</button>
            </section>

            <img src={detail.Foto} alt={`foto de ` + detail.Nombre} width="343" height='114' />
            <Box component="fieldset" mb={0} borderColor="transparent">
                <Rating name="read-only" value={detail.Puntuacion} precision={0.5} readOnly />
            </Box>
            <button onClick={() => favorites(detail.Reviewsid)}>
                {lleno ? <img src={Cfull} alt="Corzon lleno" /> : <img src={CEmpty} alt="Corzon vacio" />}
            </button>

            <p>{detail.Nombre}</p>
            <p>{detail.Direccion}</p>
            <button onClick={() => detailPlace(detail.Nombre)}>info</button>
            <p>{detail.Opinion}</p>

            <p className='parrafo'>Instalaciones</p>
            <ul className="lista">
                {Anchurapuerta === 0 ? <li> <img src={TickNo} alt="" /> Ancho puertas</li> : <li> <img src={TickOk} alt="" /> Ancho puertas</li>}
                {Giropasillo === 0 ? <li> <img src={TickNo} alt="" /> Giro sillas</li> : <li> <img src={TickOk} alt="" /> Giro sillas</li>}
                {Rampas === 0 ? <li> <img src={TickNo} alt="" /> Rampas</li> : <li> <img src={TickOk} alt="" /> Rampas</li>}
                {Escaleras === 0 ? <li> <img src={TickNo} alt="" /> Escaleras </li> : <li> <img src={TickOk} alt="" /> Escaleras</li>}
                {Ascensores === 0 ? <li> <img src={TickNo} alt=""  /> Ascensores</li> : <li> <img src={TickOk} alt="" />Ascensores </li>}
                {Parking === 0 ? <li> <img src={TickNo} alt="" /> Parking</li> : <li> <img src={TickOk} alt="" /> Parking</li>}
                {Barrabaño === 0 ? <li> <img src={TickNo} alt=""  />Barra baño </li> : <li> <img src={TickOk} alt="" /> Barra baño</li>}
                {Bañoadaptado === 0 ? <li> <img src={TickNo} alt="" /> Baño adaptado</li> : <li> <img src={TickOk} alt=""/> Baño Adaptado</li>}
            </ul>

        </div>)
    }


    console.log(`detail`, detail)
    return (
        <>
            {detail.Nombre?paintDetail():<></>}
        </>
    )
}

export default DetailReview
