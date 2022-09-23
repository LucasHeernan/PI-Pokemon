import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_DETAILS, GET_TYPES } from '../actionTypes';

const initialState = {
    all: [],
    pokemon: {},
    details: {},
    types: []
}

const pokeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                all: action.payload
            }
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                pokemon: action.payload
            }
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                pokemon: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        default:
            return { ...state };
    }
}

export default pokeReducer;