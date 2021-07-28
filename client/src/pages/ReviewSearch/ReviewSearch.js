import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { appContext } from '../../context/appContext'
import CardReview from '../../components/CardReview/CardReview'

function ReviewSearch() {

    const { search } = useContext(appContext)
    let history = useHistory()
    const getDetailReview = (e,idreview) => {
        console.log(`e`, e)
        console.log(`btn`, e.target.name)
        console.log(`img`, e.target.name)
        
        if( e.target.name === 'btnfav'||'imgfav'){
            
        }
        
        history.push(`/Detail/${idreview}`)
    }

    const paintSearch = () => {

        if (search.response.length > 0) {
            return search.response.map((elem, i) =>
                // console.log(`elem`, elem)
                <CardReview key={i} data={elem} detail={getDetailReview} />
            )
        } else {
            return <p>No se encontraron resultados</p>
        }
    }
    return (
        <>
            {paintSearch()}
        </>
    )
}

export default ReviewSearch
