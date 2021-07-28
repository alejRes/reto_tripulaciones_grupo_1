import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { appContext } from '../../context/appContext'
import CardReview from '../../components/CardReview/CardReview'
import Logo from '../../images/logo.png'
import Flecha from '../../images/flecha.svg'

function ReviewSearch() {

    const { search } = useContext(appContext)
    let history = useHistory()
    const getDetailReview = (e, idreview) => {
        console.log(`e`, e)
        console.log(`btn`, e.target.name)
        console.log(`img`, e.target.name)

        if (e.target.name === 'btnfav' || 'imgfav') {

        }

        history.push(`/Detail/${idreview}`)
    }
    const goback =()=>{
        history.push('/search')
    }

    const paintSearch = () => {

        if (search.response.length > 0) {
            return (
                    
                
                    search.response.map((elem, i) =>
                    // console.log(`elem`, elem)
                    <CardReview key={i} data={elem} detail={getDetailReview} />
                    )
                
            )
        } else {
            return (
                <>
                    <p>No se encontraron resultados</p>
                    <button onClick={goback} className='btnVolver2'><img src={Flecha} alt="Volver a busqueda" /></button>
                </>
            )
        }
    }
    return (
        <>  
            <img className='imgsign' src={Logo} alt="logo" />
            <h2 className='margin'>Hemos encontrado {search.response.length} resultados</h2>
            {paintSearch()}
        </>
    )
}

export default ReviewSearch
