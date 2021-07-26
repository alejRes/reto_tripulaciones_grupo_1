import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa"
import './AddReviews.css'
export default function AddReviews() {
    const [rating, setRating] = useState(null)

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        data.valoracion = rating
        console.log(data)
    };

    return (
        <form onSubmit={
            handleSubmit(onSubmit)
        }>
            <label for="nombreSitio">¿Dónde has estado?</label>

            <input {...register("nombreSitio")} id="nombreSitio" />

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
            <input type="checkbox" id="HuecoPasillo" value="HuecoPasillo" {...register("huecoPasillo")} /><label for="HuecoPasillo">Anchura de las puertas</label>
            <input type="checkbox" id="GiroSillas" value="GiroSillas" {...register("GiroSillas")} /><label for="GiroSillas">Radio de giro</label>
            <input type="checkbox" id="Rampas" value="Rampas" {...register("Rampas")} /><label for="Rampas">Rampas</label>
            <input type="checkbox" id="Escaleras" value="Escaleras" {...register("Escaleras")} /><label for="Escaleras">Escaleras</label>
            <input type="checkbox" id="Ascensores" value="Ascensores" {...register("Ascensores")} /><label for="Ascensores">Ascensores</label>
            <input type="checkbox" id="Parking" value="Parking" {...register("Parking")} /><label for="Parking">Parking</label>
            <input type="checkbox" id="BarraBano" value="BarraBanio" {...register("BarraBano")} /><label for="BarraBano">Barra de soporte</label>
            <input type="checkbox" id="BarraBano" value="Banio" {...register("BarraBano")} /><label for="BarraBano">Baños adaptados</label>

            <div className="stars">
                <h3>¿Cómo valoras esta experiencia?</h3>
                {
                    [...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return <label>
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
