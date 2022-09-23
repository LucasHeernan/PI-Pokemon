import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../redux/actions";

// COMPONENTE DETALLES
// Se muestra en la ruta {/home/id}

export default function Details() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const details = useSelector((store) => store.details);

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, id])

    return (
        <article>
            <section>
                <h2>{details.name}</h2>
                <img src={details.img} alt="poke"/>
                <p>Life: {details.hp}</p>
                <p>Attack: {details.attack}</p>
                <p>Defense: {details.defense}</p>
                <p>Speed: {details.speed}</p>
                <p>Height: {details.height}</p>
                <p>Weight: {details.weight}</p>
            </section>
        </article>
    )
}
