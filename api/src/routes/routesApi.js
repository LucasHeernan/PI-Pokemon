const { Router } = require('express');
const axios = require('axios');

const router = Router();

/* -----    FUNCIONES PARA TRAER LOS DATOS DE LA API    ----- */

/* TRAER LOS POKEMONS EN https://pokeapi.co/api/v2/pokemon */
const getApiPokemons = async () => {
    try {
        const api = await axios.get('https://pokeapi.co/api/v2/pokemon').then(e => e.data.results);
        const pokeUrls = api.map(e => e.url);
        const pokeData = await Promise.all(pokeUrls.map( async(e) => (await axios(e)).data))
        const pokemons = pokeData.map((p) => {
            return {
                id: p.id,
                name: p.name,
                hp: p.stats[0].base_stat,
                attack: p.stats[1].base_stat,
                defense: p.stats[2].base_stat,
                speed: p.stats[5].base_stat,
                types: p.types.map(t => ({ name: t.type.name })),
                img: p.sprites.other.dream_world.front_default,
                imgId: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`
            }
        })
        return pokemons
    } catch (err) {
        throw err;
    }
}

/* TRAER LOS POKEMONS POR ID 'https://pokeapi.co/api/v2/pokemon/{id}' */
const getApiPokemonById = async (id) => {
    try {
        const api = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`).then(e => e.data)
        const pokemon = {
            id: api.id,
            name: api.name,
            hp: api.stats[0].base_stat,
            attack: api.stats[1].base_stat,
            defense: api.stats[2].base_stat,
            speed: api.stats[5].base_stat,
            types: api.types.map(t => ({ name: t.type.name })),
            img: api.sprites.other.dream_world.front_default,
            imgId: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${api.id}.png`
        }
        return pokemon;
    } catch (err) {
        throw err;
    }
}

/* TRAER LOS POKEMONS POR NOMBRE 'https://pokeapi.co/api/v2/pokemon/{name}' */
const getApiPokemonByName = async (name) => {
    try {
        const api = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`).then(e => e.data)
        const pokemon = {
            id: api.id,
            name: api.name,
            hp: api.stats[0].base_stat,
            attack: api.stats[1].base_stat,
            defense: api.stats[2].base_stat,
            speed: api.stats[5].base_stat,
            types: api.types.map(t => ({ name: t.type.name })),
            img: api.sprites.other.dream_world.front_default,
            imgId: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${api.id}.png`
        }
        return pokemon;
    } catch (err) {
        throw err;
    }
}



















router.get('/', async (req, res, next) => {
    /* El ID puede venir por {body, params, query} */
    try {
        const { name } = req.query;
        const result = await getApiPokemonByName(name);
        res.json(result)
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    /* El ID puede venir por {body, params, query} */
    try {
        const { id } = req.params;
        const result = await getApiPokemonById(id);
        res.json(result)
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const result = await getApiPokemons();
        res.json(result)
    } catch (err) {
        next(err);
    }
});

module.exports = router;







/* const GetInfoApiPokemons = async () => {
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
} */