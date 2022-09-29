import React, { useEffect } from "react";
import SearchBar from "../searchBar/SearchBar";
import Filters from "../filters/Filters";
import Pokemon from "../pokemon/Pokemon";
import Loading from "../loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions";
import c from "./Home.module.css";


export default function Home() {

    const dispatch = useDispatch();
    const { all, pokemon } = useSelector(state => state);

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getAllPokemons());
    }, [dispatch])

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
                    <div className={c.container}>
                        {
                            pokemon?.length > 0 ?
                            pokemon.map(e => 
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
                            all?.map(e =>
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

