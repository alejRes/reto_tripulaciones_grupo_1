import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { appContext } from '../../context/appContext';
import { useHistory, useParams } from 'react-router-dom'
import Mapa from '../../images/Mapa.svg'
import Flecha from '../../images/flecha.svg'
import Compartir from '../../images/compartir.svg'
import Telefono from '../../images/telefono.svg'
import Globo from '../../images/globo.svg'
import './DetailPlace.css'


function DetailPlace() {
    const [place, setPlace] = useState("")
    const { idDetail } = useContext(appContext)
    let history = useHistory();
    const { nombre } = useParams()

    useEffect(() => {
        const detailPaces = async () => {
            let response = await axios.post('/detailPlaces', { nombre })

            setPlace(response.data[0])
        }
        detailPaces()



    }, [])

    const listarDesc = () => {
        if (place.Descripcion) {
            const arrayDesc = place.Descripcion.split(',')
            return arrayDesc.map((elem, i) => <li key={i}>{elem}</li>)
        }
    }

    const regresar = () => {
        history.push(`/detail/${idDetail}`)
    }
    console.log(`place`, place)
    return (
        <div>
            {/* <p>{place.Coordenadas}</p> */}

            <img src={Mapa} alt="Mapa" />
            <button className='btnVolver2' onClick={regresar}> <img src={Flecha} alt="Volver a reseña" /> </button>
            <section className='info'>
                <div>
                    <p className='ptitle'>{place.Nombre}</p>
                    <p>{place.Direccion}</p>
                </div>
                <button className='btnContact' value='telefono'> <img src={Telefono} alt="Telefono" /> </button>
                <button className='btnContact' value='Sitio web' > <img src={Globo} alt="Sitio web" /> </button>
                <button className='btnContact' value='Compartir'> <img src={Compartir} alt="Compartir" /> </button>
               
            </section>



            <p className='parrafo2'>Accesibilidad del sitio</p>
            <ul className='lista2'>
                {listarDesc()}
            </ul>
            <p className='pielista'>*informacion obtenida de diversas fuentes</p>

        </div>
    )
}

export default DetailPlace
