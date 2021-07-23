import React, {useState} from 'react'
import But from '../../components/But/But'
function Search() {
    const [busqueda, setBusqueda] = useState({ nombre: '', tipositio: [], tipodiscapacidad: '', gradodiscapacidad: '' })

    const handleclick = (value) => {

    }

    const sendSearch =()=>{

    }


    return (
        <div>
            <input type="text" name="nombre" id="nombre" placeholder='¿Que quieres ver?' />
            <But click={handleclick} value='museos'/>
            <But click={handleclick} value='teatros'/>
            <But click={handleclick} value='Galerias'/>
            <But click={handleclick} value='Salas'/>
            <But click={handleclick} value='Monumentos'/>
            <But click={handleclick} value='Parques'/>
            <But click={handleclick} value='Mercados'/>
            <select name="" id="">
                <option value="visual">Visual</option>
                <option value="fisica">Fisica</option>
                <option value="Intelectual">Intelectual</option>
                <option value=""></option>
                <option value=""></option>
            </select>
            <select name="" id="">
                <option value="33"> {"<"}33% </option>
                <option value="55"> 33% - 66%</option>
                <option value="66">{">"}66%</option>
            </select>
            <button onClick={sendSearch} value='buscar'>Buscar</button>
        </div>
    )
}

export default Search
