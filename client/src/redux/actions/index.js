import { GET_ALL_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES } from '../actionTypes';
import axios from 'axios';

/* 
 http://localhost:3001/pokemons
 http://localhost:3001/pokemons/:id
 http://localhost:3001/pokemons/?nombre=
 http://localhost:3001/pokemons/type
*/

export function getAllPokemons() {
    return async (dispatch) => {
        try {
            const data = axios(`http://localhost:3001/pokemons`).then(e => e.data);
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
            const data = axios(`http://localhost:3001/pokemons/${id}`).then(e => e.data);
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
            const data = axios(`http://localhost:3001/pokemons/${name}`).then(e => e.data);
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export function getTypes(name) {
    return async (dispatch) => {
        try {
            const data = axios(`http://localhost:3001/pokemons/types`).then(e => e.data);
            return dispatch({
                type: GET_TYPES,
                payload: data
            })
        } catch (err) {
            console.log(err)
        }
    }
}