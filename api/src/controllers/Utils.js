const axios = require('axios');
const { Pokemon, Types } = require('../db.js');

/* FUNCIÓN PARA TRAER POKEMONS DE LA API */
const getApiPokemons = async () => {
    // let api = await axios('https://pokeapi.co/api/v2/pokemon').then(e => e.data.results);
    // let pokemons = api.map(p => p.url);
    // return pokemons;
    let api = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40').then(e => e.data.results)
    let prom = api.map(pokemon => pokemon.url)
    let join = prom.map(url => axios(url).then(e => e.data))
    join = await Promise.all(join)
    const getApiData = await join.map(e => {
        return {
            id: e.id,
            name: e.name,
            img: e.sprites.other.home.front_default,
            abilities:e.abilities.map((t) => t.ability.name),
            sprite: e.sprites.versions["generation-v"]["black-white"].animated.front_default,
            sprite: e.sprites.sprites/other/official-artwork,
            attack: e.stats[1].base_stat,
            defense : e.stats[2].base_stat,
            hp: e.stats[0].base_stat,
            speed: e.stats[5].base_stat,
            weight: e.weight,
            height: e.height,
            type: e.types.map((t) => t.type.name),
        }
    })

    return  getApiData;
}


module.exports = {
    getApiPokemons
}

/* const GetInfoApiPokemons= async() =>{

    let api = await axios(https://pokeapi.co/api/v2/pokemon?offset=0&limit=40).then(e => e.data.results)
    let prom = api.map(pokemon => pokemon.url)
    let join = prom.map(url => axios(url).then(e => e.data))
    join = await Promise.all(join)
    const getApiData = await join.map(e => {
        return {
            id: e.id,
            name: e.name,
            img: e.sprites.other.home.front_default,
            abilities:e.abilities.map((t) => t.ability.name),
            sprite: e.sprites.versions["generation-v"]["black-white"].animated.front_default,
            sprite: e.sprites.sprites/other/official-artwork,
            attack: e.stats[1].base_stat,
            defense : e.stats[2].base_stat,
            hp: e.stats[0].base_stat,
            speed: e.stats[5].base_stat,
            weight: e.weight,
            height: e.height,
            type: e.types.map((t) => t.type.name),
        }
    })

    return  getApiData;
  } */