import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../../redux/actions";

// COMPONENTE DETALLES
// Se muestra en la ruta {/home/id}

export default function Details() {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { details } = useSelector(store => store);

    useEffect(() => {
        dispatch(getPokemonByName(name))
    }, [dispatch, name])

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
                <p>Types: {details.types?.map(e => e.name)}</p>
            </section>
        </article>
    )
}
