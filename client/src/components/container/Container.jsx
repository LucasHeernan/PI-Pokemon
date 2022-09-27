import React/* , { useEffect } */ from "react";
import { /* useDispatch, */ useSelector } from "react-redux";
// import { getAllPokemons } from "../../redux/actions";
import Pokemon from "../pokemon/Pokemon";
import c from "./Container.module.css";

// COMPONENTE CONTENEDOR DE ALL || EL POKEMON BUSCADO POR NAME

export default function Container() {

    // const dispatch = useDispatch();
    const { all, pokemon } = useSelector((store) => store);

    // useEffect(() => {
    //     dispatch(getAllPokemons());
    // }, [dispatch]);

    // LA LOGICA ES: Sí pokemon[0] es un object, mostrar rl object sino mostrar all
    // EN CODIGO ==> typeof pokemon[0] === "object" ? pokemon : all

    return (
        <section className={c.container} >
            {
                Object.values(pokemon).length ?
                <div>
                    <Pokemon
                        name={pokemon.name}
                        imgId={pokemon.imgId}
                        types={pokemon.types}
                        id={pokemon.id}
                    />
                </div> :
                all?.map(e =>
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
