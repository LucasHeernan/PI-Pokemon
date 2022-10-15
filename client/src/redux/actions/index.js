import axios from 'axios';
import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON, 
SORT_BY_ATTACK, SORT_BY_NAME, SORT_BY_ORIGIN, SORT_BY_TYPE, CLEAR_DETAIL, CLEAR_HOME, GET_MORE_POKEMONS } from '../actionTypes';

export function getAllPokemons() {
    return async (dispatch) => {
        try {
            const data = await axios(`http://localhost:3001/pokemons`).then(e => e.data);
            return dispatch({
                type: GET_ALL_POKEMONS,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getPokemonById(id) {
    return async (dispatch) => {
        try {
            const data = await axios(`http://localhost:3001/pokemons/${id}`).then(e => e.data);
            return dispatch({
                type: GET_POKEMON_BY_ID,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function postPokemon(pokemon) {
    return async (dispatch) => {
        try {
            const data = await axios.post(`http://localhost:3001/pokemons`, pokemon).then(e => e.data);
            return dispatch({
                type: POST_POKEMON,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getPokemonByName(name) {
    return async (dispatch) => {
        try {
            const data = await axios(`http://localhost:3001/pokemons?name=${name}`).then(e => e.data);
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: data
            });
        } catch (err) {
            dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: {
                    err: 'NO SE ENCONTRO NINGÚN POKEMON CON ESE NOMBRE',
                    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg",
                    imgId: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                }
            });
        }
    }
}

export function getTypes() {
    return async (dispatch) => {
        try {
            const data = await axios(`http://localhost:3001/types`).then(e => e.data);
            return dispatch({
                type: GET_TYPES,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getMorePokemons(lastPoke) {
    return async (dispatch) => {
        try {
            const data = await axios(`http://localhost:3001/pokemons?lastPoke=${lastPoke}`).then(e => e.data);
            return dispatch({
                type: GET_MORE_POKEMONS,
                payload: data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function clearDetail() {
    return { type: CLEAR_DETAIL, payload: [] }
}

export function clearHome() {
    return { type: CLEAR_HOME, payload: [] }
}

export function orderByAttack(payload) {
    return { type: SORT_BY_ATTACK, payload }
}
export function orderByName(payload) {
    return { type: SORT_BY_NAME, payload }
}
export function orderByOrigin(payload) {
    return { type: SORT_BY_ORIGIN, payload }
}
export function orderByType(payload) {
    return { type: SORT_BY_TYPE, payload }
}