const axios = require('axios');
const { Types } = require('../db');


// TRAER LOS POKEMONS EN https://pokeapi.co/api/v2/pokemon
async function getApiPokemons() {
    try {
        const api = await axios('https://pokeapi.co/api/v2/pokemon').then(e => e.data);
        const apiNext = await axios(api.next);
        const forty = [...api.results, ...apiNext.data.results];
        const pokeUrls = forty.map(e => e.url);
        const pokeData = await Promise.all(pokeUrls.map(async (e) => (await axios(e)).data));
        const pokemons = pokeData.map((p) => {
            return {
                id: p.id,
                name: p.name,
                hp: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                speed: p.stats[5].base_stat,
                height: p.height,
                weight: p.weight,
                types: p.types.map((t) => ({ name: t.type.name })),
                img: p.sprites.other.dream_world.front_default,
                imgId: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`
            };
        });
        return pokemons;
    } catch (err) {
        throw err;
    }
}

// TRAER LOS POKEMONS POR ID 'https://pokeapi.co/api/v2/pokemon/{id}'
async function getApiPokemonById(id) {
    try {
        const api = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`).then(e => e.data);
        const pokemon = {
            id: api.id,
            name: api.name,
            hp: api.stats[0].base_stat,
            attack: api.stats[1].base_stat,
            defense: api.stats[2].base_stat,
            speed: api.stats[5].base_stat,
            height: api.height,
            weight: api.weight,
            types: api.types.map((t) => ({ name: t.type.name })),
            img: api.sprites.other.dream_world.front_default,
            imgId: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${api.id}.png`
        };
        return pokemon;
    } catch (err) {
        throw err;
    }
}

// TRAER LOS POKEMONS POR NOMBRE 'https://pokeapi.co/api/v2/pokemon/{name}'
async function getApiPokemonByName(name) {
    const short = name.toLocaleLowerCase();
    try {
        const api = await axios(`https://pokeapi.co/api/v2/pokemon/${short}`).then(e => e.data);
        const pokemon = {
            id: api.id,
            name: api.name,
            hp: api.stats[0].base_stat,
            attack: api.stats[1].base_stat,
            defense: api.stats[2].base_stat,
            speed: api.stats[5].base_stat,
            height: api.height,
            weight: api.weight,
            types: api.types.map((t) => ({ name: t.type.name })),
            img: api.sprites.other.dream_world.front_default,
            imgId: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${api.id}.png`
        };
        return pokemon;
    } catch (err) {
        throw err;
    }
}

/* TRAER TODOS LOS TIPOS DE POKEMONS 'https://pokeapi.co/api/v2/type' */
/* Y GUARDARLOS EN LA TABLA TYPES DE LA BASE DE DATOS */
async function getApiTypes() {
    try {
        let types = await Types.findAll();
        if (!types.length) {
            const api = await axios(`https://pokeapi.co/api/v2/type`).then(e => e.data.results);
            let allTypes = api.map(e => ({ name: e.name }));
            types = await Types.bulkCreate(allTypes);
        } else {
            return types;
        }
    } catch (err) {
        throw err;
    }
}

async function getMorePokemons(lastPoke) {
    try {
        const api = await axios(`https://pokeapi.co/api/v2/pokemon?offset=${lastPoke}&limit=40`).then(e => e.data);
        const forty = [...api.results];
        const pokeUrls = forty.map(e => e.url);
        const pokeData = await Promise.all(pokeUrls.map(async (e) => (await axios(e)).data));
        const pokemons = pokeData.map((p) => {
            return {
                id: p.id,
                name: p.name,
                hp: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                speed: p.stats[5].base_stat,
                height: p.height,
                weight: p.weight,
                types: p.types.map((t) => ({ name: t.type.name })),
                img: p.sprites.other.dream_world.front_default,
                imgId: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`
            };
        });
        return pokemons;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getApiPokemons,
    getApiPokemonById,
    getApiPokemonByName,
    getApiTypes,
    getMorePokemons
}