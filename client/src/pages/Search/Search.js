import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { appContext } from '../../context/appContext'
import axios from 'axios'

import Logo from '../../images/logo.png'
import Lupa from '../../images/lupa.svg'

import './Search.css'

import But from '../../components/But/But'

function Search() {
    const [busqueda, setBusqueda] = useState({ nombre: '', tipositio: [], tipodiscapacidad: '', gradodiscapacidad: '' })
    const [datalist, setDatalist] = useState([])
    const [visible, setVisible] = useState(true)
    const { setSearch } = useContext(appContext)


    let history = useHistory()

    useEffect(() => {
        const getPlaces = async () => {
            let resp = await axios.get('/getNamePlaces')
            if (resp.data.length > 0) {
                setDatalist(resp.data)
            }
        }
        if (datalist.length == 0) getPlaces()


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
        if (active) {
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

        if (resp.data.response.error) {
            setVisible(false)
        } else {
            setSearch(resp.data)
            history.push('/reviews')
        }
        // controlar la respuesta cuando tengamos la base de datos o controlarlo en la nueva vista


    }

    const optionDatalist = () => {

        if (datalist.length > 0) {
            return datalist.map((elem, i) =>

                <option key={i} value={elem.Nombre} className="datalist" />
            )
        }
    }

    return (

        <div className='search'>
            <img className='imglogin' src={Logo} alt="logo" />
            <input className='inputtext' type="text" name="nombre" list='places' id="nombre" placeholder='¿Que sitio quieres ver?' onChange={handleInput} />
            <datalist id='places' className="datalist">
                {optionDatalist()}
            </datalist >
            <div className='section'>
                <But click={handleclick} value='museo' id='museos' />
                <But click={handleclick} value='galeria' id='galerías' />
                <But click={handleclick} value='teatro' id='teatro' />
            </div>

            <div>
                <But click={handleclick} value='exposiciones' id='exposiciones' />
                <But click={handleclick} value='monumento' id='monumentos' />
            </div>

            <div>
                <But click={handleclick} value='sala' id='salasdemusica' />
                <But click={handleclick} value='parque' id='parques' />
                <But click={handleclick} value='mercado' id='mercados' />
            </div>

            <div className='disc'>
                <select className='selection' name="Discapacidad" id="" onChange={handleSelectDisc}>
                    <option value="">Discapacidad</option>
                    <option id='visual' value="visual" >Visual</option>
                    <option id='motora' value="fisica">Fisica</option>
                    <option id='intelectual' value="intelectual">Intelectual</option>
                    <option id='auditiva ' value="auditiva">Auditiva</option>
                </select>
                <select className='selection' name="Grado" id="" onChange={handleSelectGrado}>
                    <option value="">Grado</option>
                    <option value="33" > {"<"}33% </option>
                    <option value="55"> 33% - 66%</option>
                    <option value="66">{">"}66%</option>
                </select>
            </div>

            <button className='imgLupa' onClick={sendSearch} value='buscar'> <img src={Lupa} alt="" /> </button>
            {visible ? <></> : <p className='aviso2'>Tienes que hacer una seleccion para realizar una busqueda</p>}
        </div>
    )
}

export default Search
