import React, { useState, useEffect } from "react";
import SearchBar from "../searchBar/SearchBar";
import Filters from "../filters/Filters";
import Pokemon from "../pokemon/Pokemon";
import Loading from "../loading/Loading";
import Paginated from "../paginated/Paginated";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions";
import c from "./Home.module.css";


export default function Home() {

    const dispatch = useDispatch();
    const { all, pokemons, types } = useSelector(state => state);

    //    ESTADOS PARA MOSTRAR 12 POKEMONS POR PÁGINA
    const [currentPage, setCurrentPage] = useState(1); // EMPIEZO EN 1
    const [pokesPerPage, /* setPokesPerPage */] = useState(12);

    //    INDICES DEL PRIMER Y ULTIMO POKEMON DE LA PÁGINA
    const lastPoke = currentPage * pokesPerPage;
    const firstPoke = lastPoke - pokesPerPage;

    //    ARRAY DEL PAGINADO ACTUAL
    const currentPokes = all.slice(firstPoke, lastPoke);

    function paginated(page) {
        setCurrentPage(page)
    };

    function handlePrev() {
        setCurrentPage(currentPage - 1)
    };

    function handleNext() {
        setCurrentPage(currentPage + 1)
    };

    useEffect(() => {
        !types.length && dispatch(getTypes());
        !all.length && dispatch(getAllPokemons());
    }, [dispatch, types, all]);

    return (
        <div>
            {
                all.length < 2 ?
                <div>
                    <Loading />
                </div> :
                <div>
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        <Filters />
                    </div>
                    <div>
                        <Paginated
                            pokesPerPage={pokesPerPage}
                            paginated={paginated}
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                            lastPoke={lastPoke}
                        />
                    </div>
                    <div className={c.container}>
                        {
                            /* pokemon lo uso para los filtrados??? */
                            pokemons?.length > 0 ?
                            pokemons.map(e =>
                                <div key={e.id}>
                                    <Pokemon
                                        name={e.name}
                                        img={e.img}
                                        imgId={e.imgId}
                                        types={e.types}
                                        id={e.id}
                                    />
                                </div>
                            ) :
                            /* all lo voy a usar para el paginado??? */
                            /* ahora debería mapear el array de paginado */
                            currentPokes?.map(e =>
                                <div key={e.id}>
                                    <Pokemon
                                        name={e.name}
                                        img={e.img}
                                        imgId={e.imgId}
                                        types={e.types}
                                        id={e.id}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}

