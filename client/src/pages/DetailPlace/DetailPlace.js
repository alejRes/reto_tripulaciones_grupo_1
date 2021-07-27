import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { appContext } from '../../context/appContext';
import { useHistory, useParams } from 'react-router-dom'


function DetailPlace() {
    const [place, setPlace] = useState("")
    const {idDetail}=useContext(appContext)
    let history = useHistory();
    const{nombre}=useParams()

    useEffect(() => {
        const detailPaces =async()=>{
            let response = await axios.post('/detailPlaces', {nombre})
            
             setPlace(response.data[0])
        }
        detailPaces()
        

       
    }, [])

    const listarDesc =()=>{
        if(place.Descripcion){
            const arrayDesc = place.Descripcion.split(',')
            return arrayDesc.map((elem,i)=> <li key={i}>{elem}</li>)
        }
    }

    const regresar =()=>{
        history.push(`/detail/${idDetail}`)
    }
      console.log(`place`, place)
    return (
        <div>
            <p>{place.Coordenadas}</p>
            <button onClick={regresar}>volver</button>

            <p>{place.Nombre}</p>
            <p>{place.Direccion}</p>
            <button></button>
            <button></button>
            <button></button>

            <p>Accesibilidad del sitio</p>
            <ul>
                {listarDesc()}
            </ul>
            
        </div>
    )
}

export default DetailPlace
