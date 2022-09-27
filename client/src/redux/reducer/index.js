import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON, 
ORDER_BY_ATTACK, ORDER_BY_NAME, ORDER_BY_TYPE } from '../actionTypes';

const initialState = {
    all: [],
    pokemon: [],
    details: [],
    types: [],
    post: {}
}

const pokeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                all: state.all.length > 1 ? state.all : action.payload,
                pokemon: state.pokemon.length > 1 ? state.pokemon : action.payload
            }
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                details: action.payload
            }
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                details: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case POST_POKEMON:
            return {
                ...state,
                post: action.payload
            }
        case ORDER_BY_ATTACK:
            let attack = action.payload === "ASC" ? 
            state.all.sort((a, b) => { return b.attack - a.attack }) :
            state.all.sort((a, b) => { return a.attack - b.attack });
            return {
                ...state,
                all: attack,
            }
        case ORDER_BY_NAME:
            let abc = [...state.all]
            abc = abc.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return action.payload === 'ASC' ? -1 : 1
                if (a.name.toLowerCase() > b.name.toLowerCase()) return action.payload === 'DESC' ? -1 : 1
                return 0
            })
            return {
                ...state,
                all: action.payload === 'All' ? state.all : abc
            }
            case ORDER_BY_TYPE:
                const allPokes = state.all;
                const typesFilter = action.payload === "ALL" ? allPokes :
                allPokes.filter(e => e.types.map(t => t.name).includes(action.payload));
                return {
                    ...state,
                    all: typesFilter
                }
        default:
            return { ...state };
    }
}

export default pokeReducer;