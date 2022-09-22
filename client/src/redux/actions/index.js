import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_DETAILS, GET_TYPES } from '../actionTypes';
import axios from 'axios';

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

export function getPokemonByName(name) {
    return async (dispatch) => {
        try {
            const data = await axios(`http://localhost:3001/pokemons/${name}`).then(e => e.data);
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getDetails(id) {
    return async (dispatch) => {
        try {
            const data = await axios.get(`http://localhost:3001/pokemons/${id}`).then(e => e.data);
            return dispatch({
                type: GET_DETAILS,
                payload: data
            })
        } catch(err){
            console.log(err)
        }
    }
}

export function getTypes() {
    return async (dispatch) => {
        try {
            const data = await axios(`http://localhost:3001/pokemons/types`).then(e => e.data);
            return dispatch({
                type: GET_TYPES,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}