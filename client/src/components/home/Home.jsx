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

    /*     -----     PAGINADO     -----     */
    const [currentPage, setCurrentPage] = useState(1);
    const [pokesPerPage, /* setPokesPerPage */] = useState(12);

    const lastPoke = currentPage * pokesPerPage;
    const firstPoke = lastPoke - pokesPerPage;

    const currentPokes = all.slice(firstPoke, lastPoke);
    const currentFilters = pokemons.length > 0 ? pokemons.slice(firstPoke, lastPoke) : null;

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
        dispatch(getAllPokemons());
    }, [dispatch, types]);

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
                        <Filters setCurrentPage={setCurrentPage} />
                    </div>
                    <div>
                        <Paginated
                            pokesPerPage={pokesPerPage}
                            currentPage={currentPage}
                            paginated={paginated}
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                        />
                    </div>
                    <div className={c.container}>
                        {
                            /* pokemons lo uso para los filtrados */
                            pokemons?.length > 0 ?
                            currentFilters.map(e =>
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
                            /* all lo voy a usar para el paginado */
                            all.length > 2 && currentPokes?.map(e =>
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

