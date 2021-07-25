import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {FaStar} from "react-icons/fa"
import './AddReviews.css'
export default function AddReviews() {
    const [rating, setRating] = useState(null)

    const {register, handleSubmit} = useForm();
    const onSubmit = data => {
        data.valoracion = rating
        console.log(data)
    };

    return (
        <form onSubmit={
            handleSubmit(onSubmit)
        }>
            <label for="nombreSitio">¿Dónde has estado?</label>

            <input {...register("nombreSitio")} id="nombreSitio"/>

            <label>Introduce tu discapacidad</label>

            <select {...register("tipoDiscapacidad")} id="discapacidad">
                <option>Discapacidad</option>
                <option value="motora">motora</option>
                <option value="sensorial">sensorial</option>
                <option value="intelectual">intelectual</option>
                <option value="psíquica">psíquica</option>
                <option value="visceral">visceral</option>
                <option value="múltiple">múltiple</option>
            </select>
            <select {...register("gradoDiscapacidad")} id="discapacidad">
                <option value="">Grado</option>
                <option value="33" > {"<"}33% </option>
                <option value="55"> 33% - 66%</option>
                <option value="66">{">"}66%</option>
            </select>

            <textarea {...register("opinion")} placeholder="Introduce reseña" />

            <div className="stars">
                {
                [...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return <label>
                        <input  type="radio" name="rating"
                            value={ratingValue}
                            onClick={
                                () => setRating(ratingValue)
                            }
                            /* onClick={() =>{ return { ...register("valoracion") }}} */
                        />
                        <FaStar  className="star"
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
                <input type="checkbox" id="HuecoPasillo" value="HuecoPasillo" {...register("huecoPasillo")}/><label for="HuecoPasillo">Hueco pasillo</label>
                <input type="checkbox" id="GiroSillas" value="GiroSillas" {...register("GiroSillas")}/><label for="GiroSillas">Giro sillas</label>
                <input type="checkbox" id="Rampas" value="Rampas" {...register("Rampas")}/><label for="Rampas">Rampas</label>
                <input type="checkbox" id="Escaleras" value="Escaleras" {...register("Escaleras")}/><label for="Escaleras">Escaleras</label>
                <input type="checkbox" id="Ascensores" value="Ascensores" {...register("Ascensores")}/><label for="Ascensores">Ascensores</label>
                <input type="checkbox" id="Parking" value="Parking" {...register("Parking")}/><label for="Parking">Parking</label>
                <input type="checkbox" id="BarraBano" value="BarraBano" {...register("BarraBano")}/><label for="BarraBano">Barra en el Baño</label>
            <input type="submit"/>
        </form>
    );
}
/* placeholder="Password" */
