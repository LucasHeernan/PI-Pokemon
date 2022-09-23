import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions";
import Pokemon from "../pokemon/Pokemon";
import c from "./Container.module.css";

// COMPONENTE CONTENEDOR DE ALL || EL POKEMON BUSCADO POR NAME

export default function Container() {

    const dispatch = useDispatch();
    const all = useSelector((store) => store.all);
    const pokemon = useSelector(store => store.pokemon);

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    // LA LOGICA ES: Sí pokemon es igual a false, mostra all pokemon y al reves
    // EN CODIGO ==> !!pokemon === true ? pokemon : all

    return (
        <section className={c.container} >
            {console.log(pokemon)}
            {
                pokemon.length === true ?
                <div>
                    <Pokemon
                        name={pokemon.name}
                        imgId={pokemon.imgId}
                        types={pokemon.types}
                        id={pokemon.id}
                    />
                </div> :
                all.map(e =>
                    <div key={e.id}>
                        <Pokemon
                            name={e.name}
                            imgId={e.imgId}
                            types={e.types}
                            id={e.id}
                        />
                    </div>
                )
            }
        </section>
    )
}
