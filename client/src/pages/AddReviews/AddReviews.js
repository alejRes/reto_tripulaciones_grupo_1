import React, { useState, useContext, useEffect } from "react";
import { appContext } from "../../context/appContext";
import { useHistory } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa"

import './AddReviews.css'

export default function AddReviews() {

    const [datalist, setDatalist] = useState([])

    const [rating, setRating] = useState(null)
    const [open, setOpen] = useState(false)

    const { register, handleSubmit } = useForm();

    const {userOk} = useContext(appContext)

    let history = useHistory()

    useEffect(() => {
        const getPlaces = async () => {
            let resp = await axios.get('/getNamePlaces')
            if (resp.data.length > 0) {
                setDatalist(resp.data)
            }
        }
        if(datalist.length==0) getPlaces() 
        if(userOk.email==="false"){

            history.push('/')
            
        }
        
    }, [])


    const insertReview = async(data)=>{

        let resp = await axios.post('/insertReview',data)

        console.log(`resp`, resp)
        if(resp.status===200){
            setOpen(true)
        }


    }

    const onSubmit = data => {
        console.log(`data`, data)
        data.email = userOk.email
        data.valoracion = rating
        const {gradoDiscapacidad,nombreSitio,opinion, tipoDiscapacidad, valoracion} = data

        if(gradoDiscapacidad&&nombreSitio&&opinion&&tipoDiscapacidad&&valoracion){
            insertReview(data)
        }
        
    };

    const optionDatalist = () => {
        
        if (datalist.length > 0) {
            return datalist.map((elem, i) =>

                <option key={i} value={elem.Nombre} />
            )
        }
    }

    return (
        <form onSubmit={
            handleSubmit(onSubmit)
        }>
            <label htmlFor="nombreSitio">¿Dónde has estado?</label>

            <input {...register("nombreSitio")} id="nombreSitio" list='places'/>
            <datalist id='places'>
                {optionDatalist()}
            </datalist>

            <label>Introduce tu discapacidad</label>

            <select {...register("tipoDiscapacidad")} id="discapacidad">
                <option value="">Discapacidad</option>
                <option value="visual" >Visual</option>
                <option value="fisica">Fisica</option>
                <option value="intelectual">Intelectual</option>
                <option value="auditiva">Auditiva</option>
            </select>
            <select {...register("gradoDiscapacidad")} id="discapacidad">
                <option value="">Grado</option>
                <option value="33" > {"<"}33% </option>
                <option value="55"> 33% - 66%</option>
                <option value="66">{">"}66%</option>
            </select>

            <h3>Escribe una reseña</h3>
            
            <textarea {...register("opinion")} placeholder="Introduce reseña" />

            <h3>¿Cumplían las instalaciones con alguna de estas características</h3>
            <p>*Marca las casillas que consideres convenientes</p>
            <input type="checkbox" id="HuecoPasillo" value={1} {...register("huecoPasillo")} /><label htmlFor="HuecoPasillo">Anchura de las puertas</label>
            <input type="checkbox" id="GiroSillas" value={1} {...register("GiroSillas")} /><label htmlFor="GiroSillas">Radio de giro</label>
            <input type="checkbox" id="Rampas" value={1} {...register("Rampas")} /><label htmlFor="Rampas">Rampas</label>
            <input type="checkbox" id="Escaleras" value={1} {...register("Escaleras")} /><label htmlFor="Escaleras">Escaleras</label>
            <input type="checkbox" id="Ascensores" value={1} {...register("Ascensores")} /><label htmlFor="Ascensores">Ascensores</label>
            <input type="checkbox" id="Parking" value={1} {...register("Parking")} /><label htmlFor="Parking">Parking</label>
            <input type="checkbox" id="BarraBano" value={1} {...register("BarraBano")} /><label htmlFor="BarraBano">Barra de soporte</label>
            <input type="checkbox" id="Banio" value={1} {...register("Banio")} /><label htmlFor="BarraBano">Baños adaptados</label>

            <div className="stars">
                <h3>¿Cómo valoras esta experiencia?</h3>
                {
                    [...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return <label  key={i}>
                            <input type="radio" name="rating"
                                value={ratingValue}
                                onClick={
                                    () => setRating(ratingValue)
                                }
                            /* onClick={() =>{ return { ...register("valoracion") }}} */
                            />
                            <FaStar className="star"
                                size={30}
                                color={
                                    ratingValue <= rating ? "#ffc107" : "#e4e5e9"
                                }
                            /*color={ratingValue <= {...register("valoration")} ? "#ffc107" : "#e4e5e9"} */
                            />
                        </label>
                    })
                }
            </div>
            <input type="submit" />
        </form>

        
    );
}
/* placeholder="Password" */
