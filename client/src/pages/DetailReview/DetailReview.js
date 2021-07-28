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
import Info from '../../images/informacion.svg'
import Flecha from '../../images/flecha.svg'
import './Detail.css'

function DetailReview() {
    const { id } = useParams()

    const { setIdDetail } = useContext(appContext)

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
        return (
            <div className='detalle'>
                <section className='entrada'>
                    <div className='avatar'>
                        <p>{detail.Username ? detail.Username[0] : <></>}</p>
                    </div>
                    <div>
                        <p className='ptitle'>{detail.Username}</p>
                        <p>{detail.Tipominusvalia } / {detail.Gradominusvalia == 33 ? "< 33%" : detail.Gradominusvalia == 55 ? "33% - 66%" : "> 66%"}</p>
                    </div>
                    <button onClick={changetoSearchReview} value='Volver' className='btnVolver'> <img src={Flecha} alt="volver" /></button>
                </section>

                <img src={detail.Foto} alt={`foto de ` + detail.Nombre} className='foto' />
                <Box className='estrellas' component="fieldset" mb={0} borderColor="transparent">
                    <Rating name="read-only" value={detail.Puntuacion} precision={0.5} readOnly />
                </Box>
                <button className='btnfavorito' onClick={() => favorites(detail.Reviewsid)}>
                    {lleno ? <img src={Cfull} alt="Corzon lleno" /> : <img src={CEmpty} alt="Corzon vacio" />}
                </button>
                <section className='cuerpo'>
                    <div className='cabecera'>
                        <div>
                            <p className='ptitle'>{detail.Nombre}</p>
                            <p>{detail.Direccion}</p>
                        </div>

                        <button onClick={() => detailPlace(detail.Nombre)} className='butInfo'> <img src={Info} alt="informacion del sitio" className='img' /> </button>
                    </div>

                    <p>{detail.Opinion}</p>
                </section >


                <p className='parrafo'>Instalaciones</p>
                <ul className="lista">
                    {Anchurapuerta === 0 ? <li> <img src={TickNo} alt="" /> Ancho puertas</li> : <li> <img src={TickOk} alt="" /> Ancho puertas</li>}
                    {Giropasillo === 0 ? <li> <img src={TickNo} alt="" /> Giro sillas</li> : <li> <img src={TickOk} alt="" /> Giro sillas</li>}
                    {Rampas === 0 ? <li> <img src={TickNo} alt="" /> Rampas</li> : <li> <img src={TickOk} alt="" /> Rampas</li>}
                    {Escaleras === 0 ? <li> <img src={TickNo} alt="" /> Escaleras </li> : <li> <img src={TickOk} alt="" /> Escaleras</li>}
                    {Ascensores === 0 ? <li> <img src={TickNo} alt="" /> Ascensores</li> : <li> <img src={TickOk} alt="" />Ascensores </li>}
                    {Parking === 0 ? <li> <img src={TickNo} alt="" /> Parking</li> : <li> <img src={TickOk} alt="" /> Parking</li>}
                    {Barrabaño === 0 ? <li> <img src={TickNo} alt="" />Barra baño </li> : <li> <img src={TickOk} alt="" /> Barra baño</li>}
                    {Bañoadaptado === 0 ? <li> <img src={TickNo} alt="" /> Baño adaptado</li> : <li> <img src={TickOk} alt="" /> Baño Adaptado</li>}
                </ul>

            </div >)
    }


    console.log(`detail`, detail)
    return (
        <>
            {detail.Nombre ? paintDetail() : <></>}
        </>
    )
}

export default DetailReview
