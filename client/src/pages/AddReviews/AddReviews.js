import React, { useState, useContext, useEffect } from "react";
import { appContext } from "../../context/appContext";
import { useHistory } from "react-router";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa"
import Logo from '../../images/logo.png'
import Lupa from '../../images/lupa.svg'

import './AddReviews.css'

export default function AddReviews() {

    const [datalist, setDatalist] = useState([])

    const [rating, setRating] = useState(null)
    const [open, setOpen] = useState(false)

    const { register, handleSubmit } = useForm();

    const { userOk } = useContext(appContext)

    let history = useHistory()

    useEffect(() => {
        const getPlaces = async () => {
            let resp = await axios.get('/getNamePlaces')
            if (resp.data.length > 0) {
                setDatalist(resp.data)
            }
        }
        if (datalist.length == 0) getPlaces()
        if (userOk.email === "false") {

            history.push('/')

        }

    }, [])


    const insertReview = async (data) => {

        let resp = await axios.post('/insertReview', data)

        console.log(`resp`, resp)
        if (resp.status === 200) {
            setOpen(true)
        }


    }

    const onSubmit = data => {
        console.log(`data`, data)
        data.email = userOk.email
        data.valoracion = rating
        const { gradoDiscapacidad, nombreSitio, opinion, tipoDiscapacidad, valoracion } = data

        if (gradoDiscapacidad && nombreSitio && opinion && tipoDiscapacidad && valoracion) {
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
        <>
            <section className='cabece'>
                <img src={Logo} alt="" />
                <h2>Cuentanos tu experiencia</h2>
            </section>

            <form onSubmit={
                handleSubmit(onSubmit)
            } className='formreview'>

                <h3 htmlFor="nombreSitio">¿Dónde has estado?</h3>

                <input className='input' {...register("nombreSitio")} id="nombreSitio" list='places' />
                <datalist id='places'>
                    {optionDatalist()}
                </datalist>

                <h3>Introduce tu discapacidad</h3>
                <section className='selects'>
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
                </section>


                <h3>Escribe una reseña</h3>

                <textarea className='textarea'{...register("opinion")} placeholder="Introduce reseña" />

                <h3>¿Cumplían las instalaciones con alguna de estas características</h3>
                <p>*Marca las casillas que consideres convenientes</p>
                <section className='checkbox'>
                    <article>
                        <div>
                            <input type="checkbox" id="HuecoPasillo" value={1} {...register("huecoPasillo")} /><label htmlFor="HuecoPasillo">Ancho de puertas</label>
                        </div>
                        <div>
                            <input type="checkbox" id="GiroSillas" value={1} {...register("GiroSillas")} /><label htmlFor="GiroSillas">Radio de giro</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Rampas" value={1} {...register("Rampas")} /><label htmlFor="Rampas">Rampas</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Escaleras" value={1} {...register("Escaleras")} /><label htmlFor="Escaleras">Escaleras</label>
                        </div>
                    </article>
                    <article>
                        <div>
                            <input type="checkbox" id="Ascensores" value={1} {...register("Ascensores")} /><label htmlFor="Ascensores">Ascensores</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Parking" value={1} {...register("Parking")} /><label htmlFor="Parking">Parking</label>

                        </div>
                        <div>
                            <input type="checkbox" id="BarraBano" value={1} {...register("BarraBano")} /><label htmlFor="BarraBano">Barra de soporte</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Banio" value={1} {...register("Banio")} /><label htmlFor="BarraBano">Baños adaptados</label>
                        </div>
                    </article>
                </section>

                <div className="stars">
                    <h3>¿Cómo valoras esta experiencia?</h3>
                    <div>
                        {
                            [...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return <label key={i}>
                                <input tabIndex='0' type="radio" name="rating"
                                        value={ratingValue}
                                        onClick={
                                            () => setRating(ratingValue)
                                        }
                                        onKeyPress={
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

                </div>
                <div className='btnEnv'>
                   <input type="submit" value='Publica tu respuesta'/>
                </div>
                
            </form>
        </>

    );
}
/* placeholder="Password" */
