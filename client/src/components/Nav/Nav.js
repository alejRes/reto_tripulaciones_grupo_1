import React from 'react'
import { useHistory } from 'react-router-dom'
import favorito from '../../images/favorito.svg'
import lupa from '../../images/lupa.svg'
import anadir from '../../images/anadir.svg'
import usuario from '../../images/usuario.svg'
import './Nav.css'

function Nav() {

    const history = useHistory()

    const changePage =(e)=>{
        switch (e.target.value) {
            case 'Favoritos':
                
                break;
            case 'Reseñas':
                history.push('/addreviews')
                break;
            case 'Explorar':
                history.push('/search');
                break;
        
            default:

                break;
        }
    }

    return (
        <div className='Navegacion'>
            <button value='Explorar' onClick={changePage} className='button'>
                <img src={lupa} alt="ir a busqueda" className='img'/>
                <p className='p'>Explorar</p> 
            </button>
            <button value='Reseñas'className='button'>
                <img src={anadir} alt="ir a meter Reseña" className='img'/>
                <p className='p'>Reseñas</p> 
            </button>
            <button value='Favoritos'className='button'>
                <img src={favorito} alt="ir a favoritos" className='img'/>
                <p className='p'>Favoritos</p> 
            </button>
            <button value='Perfil'className='button'>
                <img src={usuario} alt="ir a perfil" className='img'/>
                <p className='p'>Mi perfil</p> 
            </button>
        </div>
    )
}

export default Nav
