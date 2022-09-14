const { Router } = require('express');
const axios = require('axios');

const router = Router();

/* -----    FUNCIONES PARA TRAER LOS DATOS DE LA API    ----- */

/* TRAER LOS POKEMONS EN https://pokeapi.co/api/v2/pokemon */

const getApiPokemons = async () => {
    try {
        const api = await axios.get('https://pokeapi.co/api/v2/pokemon').then(e => e.data.results);
        const pokeUrls = api.map(e => e.url);
        const pokeData = await Promise.all(pokeUrls.map(async(e) => (await axios(e)).data))
        // const pokeUrls = await Promise.all(api.map(e => await axios(e.url)))
        return pokeData
    } catch (error) {
        console.log(error)
    }
}

// getPokemonsApi : async () => {
//     try {
//         if(!fastLoadPokemons.length){
//             const pageOne = await axios.get('https://pokeapi.co/api/v2/pokemon');
//             const pageTwo = await axios.get(pageOne.data.next);

//             const allPages = pageOne.data.results.concat(pageTwo.data.results);
//             //console.log('todas las paginas',allPages)

//             const allData = await Promise.all(allPages.map(async (links) => (await axios.get(links.url)).data));
//             //console.log('promesas resueltas para mapear',allData)
        
//             const pokemons = allData.map((pokemon)=>{
//                 return{
//                     id: pokemon.id,
//                     name: pokemon.name,
//                     image: pokemon.sprites.other.dream_world.front_default || "https://w7.pngwing.com/pngs/661/707/png-transparent-pokemon-sun-and-moon-pokemon-black-white-pokemon-diamond-and-pearl-pokemon-x-and-y-the-pokemon-company-others-text-rectangle-logo-thumbnail.png" ,
//                     height: pokemon.height,
//                     weight: pokemon.weight,
//                     types: pokemon.types.map(t => ({ name: t.type.name })),
//                     hp: pokemon.stats[0].base_stat,
//                     attack: pokemon.stats[1].base_stat,
//                     defense: pokemon.stats[2].base_stat,
//                     speed: pokemon.stats[5].base_stat,
//                 };
//             });
//             fastLoadPokemons = [...pokemons];
//             return pokemons;
//         } return fastLoadPokemons;
//     } catch (error) {
//         console.log (error)
//         throw error 
//     }
// }

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












/* TRAER LOS POKEMONS POR ID 'https://pokeapi.co/api/v2/pokemon/{id}' */
/* TRAER LOS POKEMONS POR NAME 'https://pokeapi.co/api/v2/pokemon/{name}' */
/* TRAER LOS POKEMONS POR TYPE 'https://pokeapi.co/api/v2/type' */

// router.get('/' , async (req , res) => {
//     let api = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40').then(e => e.data.results)
//     let prom = api.map(pokemon => pokemon.url)
//     let join = prom.map(url => axios(url).then(e => e.data))
//     join = await Promise.all(join)
//     const getApiData = await join.map(e => {
//         return {
//             id: e.id,
//             name: e.name,
//             hp: e.stats[0].base_stat,
//             attack: e.stats[1].base_stat,
//             defense : e.stats[2].base_stat,
//             speed: e.stats[5].base_stat,
//             height: e.height,
//             weight: e.weight,
//             img: e.sprites.other.home.front_default,
//             type: e.types.map((t) => t.type.name)
//         }
//     })
//     res.json(getApiData);
// });

router.get('/', async(req, res) => {
    try {
        const result = await getApiPokemons();
        res.json(result)
    } catch (error) {
        console.log(error)
    }
});
// router.get('/', async(req, res) => {
//     res.json(getApiPokemons())
// });


module.exports = router
