import axios from 'axios';
import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, POST_POKEMON,
ORDER_BY_ATTACK, ORDER_BY_NAME, ORDER_BY_TYPE } from '../actionTypes';

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
            const data = await axios.post(`http://localhost:3001/pokemons`, pokemon).then(e => e.data)
            return dispatch({
                type: POST_POKEMON,
                payload: data
            })
        } catch (err) {
            console.log(err);
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
            })
        } catch (err) {
            console.log(err)
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

export function orderByAttack(payload) {
    return { type: ORDER_BY_ATTACK, payload }
}
export function orderByName(payload) {
    return { type: ORDER_BY_NAME, payload }
}
export function orderByType(payload) {
    return { type: ORDER_BY_TYPE, payload }
}