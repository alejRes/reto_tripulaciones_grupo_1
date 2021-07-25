import React from 'react'

function CardReview(props) {

    console.log(`props`, props)
    return (
        <article onClick ={()=>{props.detail(props.data.reviewID)}}>
            <p>{props.data.tipoDiscapacidad}</p>
            <p>{props.data.nombre}</p>
            <p>{props.data.gradoDiscapacidad}</p>
            <p>{props.data.direccion}</p> 
        </article>
    )
}

export default CardReview
