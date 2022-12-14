import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON, 
SORT_BY_ATTACK, SORT_BY_NAME, SORT_BY_ORIGIN, SORT_BY_TYPE, CLEAR_DETAIL, CLEAR_HOME, GET_MORE_POKEMONS } from '../actionTypes';

const initialState = {
    all: [],
    pokemons: [],
    detail: [],
    types: []
}

const pokeReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                all: state.all.length ? state.all : action.payload,
            }
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                detail: action.payload
            }
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                detail: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case POST_POKEMON:
            return {
                ...state,
                all: [...state.all, action.payload]
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case CLEAR_HOME:
            return {
                ...state,
                all: action.payload,
                pokemons: action.payload
            }
        case SORT_BY_ATTACK:
            let attack = [...state.all]
            attack = attack.sort((a, b) => {
                if (action.payload === 'ASC') return b.attack - a.attack; 
                if (action.payload === 'DES') return a.attack - b.attack;
                return 0
            })
            let pokeAttack = [...state.pokemons]
            pokeAttack = pokeAttack.sort((a, b) => {
                if (action.payload === 'ASC') return b.attack - a.attack; 
                if (action.payload === 'DES') return a.attack - b.attack;
                return 0
            })
            return {
                ...state,
                pokemons: state.pokemons.length ? pokeAttack : attack
            }
        case SORT_BY_NAME:
            let abc = [...state.all];
            abc = abc.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return action.payload === 'ASC' ? -1 : 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return action.payload === 'DES' ? -1 : 1;
                return 0
            })
            let pokeAbc = [...state.pokemons];
            pokeAbc = pokeAbc.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return action.payload === 'ASC' ? -1 : 1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return action.payload === 'DES' ? -1 : 1;
                return 0
            })
            return {
                ...state,
                pokemons: state.pokemons.length ? pokeAbc : abc
            }
        case SORT_BY_ORIGIN:
            const origin = action.payload === 'CREATED' ?
            state.all.filter(e => typeof e.id === 'string') : state.all.filter(e => typeof e.id === 'number')
            return {
                ...state,
                pokemons: action.payload === 'ALL' ? state.all : origin
            }
        case SORT_BY_TYPE:
            const allPokes = state.all;
            const typesFilter = action.payload === 'ALL' ? allPokes :
            allPokes.filter(e => e.types.map(t => t.name).includes(action.payload));
            return {
                ...state,
                pokemons: typesFilter
            }
        case GET_MORE_POKEMONS:
            return {
                ...state,
                all: action.payload
            }
        default:
        return { ...state };
    }
}

export default pokeReducer;