const axios = require('axios');
const { Types } = require('../db');


// TRAER LOS POKEMONS EN https://pokeapi.co/api/v2/pokemon
async function getApiPokemons() {
    try {
        const api = await axios('https://pokeapi.co/api/v2/pokemon').then(e => e.data.results);
        const pokeUrls = api.map(e => e.url);
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
                weigth: p.weigth,
                // types: p.types.map(t => t.type.name),
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
            weigth: api.weigth,
            // types: api.types.map(t => t.type.name),
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
            weigth: api.weigth,
            // types: api.types.map(t => t.type.name),
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

// const SaveTypesDb = async () => {
//     try {
//         let api = await axios("https://pokeapi.co/api/v2/type")
//         let typesGet = api.data.results.map(e => e.name)
//         const pokemons = new Set(typesGet.flat()) //Tenga en cuenta que el flat() crea una nueva matriz y no cambia la matriz original:
//         pokemons.forEach(async t => {   //forEach() ejecuta la función indicada una vez por cada elemento del array.
//             await Types.findOrCreate({   //El método Sequelize findOrCreate() consulta que intenta encontrar una entrada en su tabla o crear una nueva entrada cuando no se encuentra nada.
//               where: {name : t}
//             })
//         })
//         const allTypes= await Types.findAll()///La findall()función escanea string de izquierda a derecha y encuentra todas las coincidencias de patternen el string.
//         return allTypes
//     }
//     catch (error) {
//         console.log("Something went wrong, ", error)
//     }
// }

//Simplemente obtenga los temperamentos de la API, cárguelos en la base de datos y envíelos de vuelta al cliente.
// const GetTypesDB = async () =>{
//     try {
//         let TypeDB = await Types.findAll();
//         TypeDB = TypeDB.map((t) => t.toJSON());
//         return TypeDB;
//     } catch (error) {
//         console.log(error);
//     }
// }
  

module.exports = {
    getApiPokemons,
    getApiPokemonById,
    getApiPokemonByName,
    getApiTypes
}