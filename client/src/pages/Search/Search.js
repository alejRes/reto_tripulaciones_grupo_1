import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { appContext } from '../../context/appContext'
import axios from 'axios'

import But from '../../components/But/But'

function Search() {
    const [busqueda, setBusqueda] = useState({ nombre: '', tipositio: [], tipodiscapacidad: '', gradodiscapacidad: '' })
    const [datalist, setDatalist] = useState([])
    const { setSearch } = useContext(appContext)

    let history = useHistory()

    useEffect(() => {
        const getPlaces = async () => {
            let resp = await axios.get('/getNamePlaces')
            if (resp.data.length > 0) {
                setDatalist(resp.data)
            }
        }
        if(datalist.length==0) getPlaces() 
           
        
    }, [])
    const handleSelectDisc = (e) => {
        setBusqueda({ ...busqueda, tipodiscapacidad: e.target.value })
    }
    const handleSelectGrado = (e) => {
        setBusqueda({ ...busqueda, gradodiscapacidad: e.target.value })
    }
    const handleInput = (e) => {
        setBusqueda({ ...busqueda, nombre: e.target.value })
    }
    const handleclick = (value, active) => {
        
        //true filtra el array para quitar
        if(active) {
            const quitarSelecion = busqueda.tipositio.filter(elem => elem != value)
            setBusqueda({ ...busqueda, tipositio: quitarSelecion })
        }
        //false añade el value al array
        else {
            setBusqueda({ ...busqueda, tipositio: [...busqueda.tipositio, value] })
        }

    }

    const sendSearch = async () => {
        
        let resp = await axios.post('/Reviews', busqueda)
        // controlar la respuesta cuando tengamos la base de datos
        setSearch(resp.data)
        history.push('/reviews')
        
    }

    const optionDatalist = () => {

        if (datalist.length > 0) {
            return datalist.map((elem, i) =>

                <option key={i} value={elem} />
            )
        }
    }

    return (
        <div>
            <input type="text" name="nombre" list='places' id="nombre" placeholder='¿Que sitio quieres ver?' onChange={handleInput} />
            <datalist id='places'>
                {optionDatalist()}
            </datalist>
            <But click={handleclick} value='museos' />
            <But click={handleclick} value='teatros' />
            <But click={handleclick} value='Galerias' />
            <But click={handleclick} value='Salas' />
            <But click={handleclick} value='Monumentos' />
            <But click={handleclick} value='Parques' />
            <But click={handleclick} value='Mercados' />
            <select name="Discapacidad" id="" onchange={handleSelectDisc}>
                <option value="">Discapacidad</option>
                <option value="visual" >Visual</option>
                <option value="fisica">Fisica</option>
                <option value="Intelectual">Intelectual</option>
                <option value="Auditiva">Auditiva</option>

            </select>
            <select name="Grado" id="" onChange={handleSelectGrado}>
                <option value="">Grado</option>
                <option value="33" > {"<"}33% </option>
                <option value="55"> 33% - 66%</option>
                <option value="66">{">"}66%</option>

            </select>
            <button onClick={sendSearch} value='buscar'>Buscar</button>
        </div>
    )
}

export default Search
