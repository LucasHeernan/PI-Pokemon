import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON, 
SORT_BY_ATTACK, SORT_BY_NAME, SORT_BY_ORIGIN, SORT_BY_TYPE, CLEAR_DETAIL, CLEAR_FILTER, CLEAR_ALL } from '../actionTypes';

const initialState = {
    all: [],
    pokemon: [],
    details: [],
    types: [],
    created: {}
}

const pokeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                all: state.all.length > 1 ? state.all : action.payload,
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
                created: action.payload
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                details: []
            }
        case CLEAR_FILTER:
            return {
                ...state,
                pokemon: []
            }
        case CLEAR_ALL:
            return {
                ...state,
                all: []
            }
        case SORT_BY_ATTACK:
            let attack = [...state.all]
            attack = attack.sort((a, b) => {
                if (action.payload === 'ASC') return b.attack - a.attack; 
                if (action.payload === 'DES') return a.attack - b.attack;
                return 0
            })
            return {
                ...state,
                pokemon: action.payload === 'DEFAULT' ? state.all : attack,
            }
        case SORT_BY_NAME:
            let abc = [...state.all]
            abc = abc.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return action.payload === 'ASC' ? -1 : 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return action.payload === 'DES' ? -1 : 1;
                return 0
            })
            return {
                ...state,
                pokemon: action.payload === 'DEFAULT' ? state.all : abc
            }
        case SORT_BY_ORIGIN:
            const origin = action.payload === 'CREATED' ?
            state.all.filter(e => typeof e.id === 'string') : state.all.filter(e => typeof e.id === 'number')
            return {
                ...state,
                pokemon: action.payload === 'ALL' ? state.all : origin
            }
        case SORT_BY_TYPE:
            const allPokes = state.all;
            const typesFilter = action.payload === 'ALL' ? allPokes :
            allPokes.filter(e => e.types.map(t => t.name).includes(action.payload));
            return {
                ...state,
                pokemon: typesFilter
            }
        default:
            return { ...state };
    }
}

export default pokeReducer;