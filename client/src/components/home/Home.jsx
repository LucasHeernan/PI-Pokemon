import React, { useEffect/* , useState */ } from "react";
import SearchBar from "../searchBar/SearchBar";
// import Container from "../container/Container";
import Filters from "../filters/Filters";
import Pokemon from "../pokemon/Pokemon";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons/* , getPokemonByName */ } from "../../redux/actions";


export default function Home() {

    const dispatch = useDispatch();
    const { all, pokemon } = useSelector(state => state);
    // const { pokemon } = useSelector(state => state);     /* Tendría que traer getPokemonByName() */
    // const [now, setNow] = useState('');                  /* Para usar con la SearchBar */

    useEffect(() => {
        // if (now === '') {
        if (all.length < 2) {
            return dispatch(getAllPokemons())
        }
        // } else {
            // dispatch(getPokemonByName(now));
        // }
    }, [dispatch, all])

    return (
        <div>
            {
                all.length < 2 ?
                <div>
                    <h2>RECALCULANDO</h2>
                </div> :
                <div>
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        <Filters />
                    </div>
                    <div>
                        {
                            pokemon?.length > 0 ?
                            pokemon.map(e => 
                                <div key={e.id}>
                                    <Pokemon
                                        name={e.name}
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

// {/* <div>
//     {all?.map(e =>
//         <div key={e.id}>
//             <Pokemon
//                 name={e.name}
//                 imgId={e.imgId}
//                 types={e.types}
//                 id={e.id}
//             />
//         </div>
//     )}
// </div> */}
// {/* <div>
//     {
//         pokemon?.length > 1 ? 
//         pokemon.map(e => 
//             <div key={e.id}>
//                 <Pokemon
//                     name={e.name}
//                     imgId={e.imgId}
//                     types={e.types}
//                     id={e.id}
//                 />
//             </div>
//         ) :
//         all?.map(e =>
//             <div key={e.id}>
//                 <Pokemon
//                     name={e.name}
//                     imgId={e.imgId}
//                     types={e.types}
//                     id={e.id}
//                 />
//             </div>
//         )
//     }
// </div> */}

// return (
//     <div>
//         {!all.length ?
//             <div>
//                 <h2>RECALCULANDO</h2>
//             </div> :
//             <div>
//                 <div>
//                     <SearchBar setNow={setNow} />
//                 </div>
//                 <div>
//                     <Filters />
//                 </div>

//                 <div>
//                     {
//                     Object.values(pokemon).length ?
//                         <div>
//                             <Pokemon
//                                 name={pokemon.name}
//                                 imgId={pokemon.imgId}
//                                 types={pokemon.types}
//                                 id={pokemon.id}
//                             />
//                         </div>
//                     :
//                        <div>
//                            {all?.map(e =>
//                                <div key={e.id}>
//                                    <Pokemon
//                                        name={e.name}
//                                        imgId={e.imgId}
//                                        types={e.types}
//                                        id={e.id}
//                                    />
//                                </div>
//                            )}
//                        </div>
//                     }
//                 </div>
//             </div>
//         }
//     </div>
// )