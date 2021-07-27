import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { appContext } from '../../context/appContext'
import CardReview from '../../components/CardReview/CardReview'

function ReviewSearch() {

    const { search } = useContext(appContext)
    let history = useHistory()
    const getDetailReview =(idreview)=>{
        history.push(`/Detail/${idreview}`)
    }

    const paintSearch = () => {

        if (search.response.length > 0) {
            return search.response.map((elem,i) => 
            // console.log(`elem`, elem)
                <CardReview key ={i} data={elem} detail={getDetailReview}/>
            )
        } else {
            return <p>No se encontraron resultados</p>
        }
    }
    return (
        <div>
            {paintSearch()}
        </div>
    )
}

export default ReviewSearch
