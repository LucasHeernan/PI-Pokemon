const { Router } = require('express');
const axios = require('axios');
const { Pokemons } = require('../db');
const { Op } = require ('sequelize');

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
    const short = name.toLocaleLowerCase();
    try {
        const api = await axios(`https://pokeapi.co/api/v2/pokemon/${short}`).then(e => e.data)
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



    /* 
        MODELS --> Se comunica con la base de datos
        ROUTES --> Son la puerta de entrada a la api
        CONTROLLERS --> Es el intermediario entre nuestras rutas y nuestra base de datos
    */



    /*  ----------      FUNCIONES PARA LA BASE DE DATOS     ----------  */



// TRAE TODOS LOS POKEMONES QUE HAYA EN LA BASE DE DATOS
const getPokemonsDb = async () => {
    try {
        const pokemonDb = await Pokemons.findAll();
        return pokemonDb;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// BUSCA POR ID EN DB
const getPokemonByIdDb = async (id) => {
    try {
        const pokemonDb = await Pokemons.findByPk(id);
        return pokemonDb;
    } catch (err) {
        console.log(err)
        throw err
    }
}

// BUSCA POR NAME EN DB
const getPokemonByNameDb = async (name) => {
    try {
        const pokemonDb = await Pokemons.findOne({
            where: { name: { [Op.like]: name } }
        });
        return pokemonDb;
    } catch (err) {
        console.log(err)
        throw err
    }
}



    /*          ----------          RUTAS          ----------          */



router.get('/', async (req, res, next) => {
    const { name } = req.query;
    let result;
    if (name) {
        try {
            result = await getPokemonByNameDb(name);
            if ( result === null ) result = await getApiPokemonByName(name);
            res.status(200).json(result)
        } catch (err) {
            res.status(400).send(`El pokemon ${name} no ha sido encontrado`)
            next(err);
        }
    } else {
        /* ACA ENTRA SI NO RECIBE NOMBRE */
        try {
            result = await getApiPokemons();
            let pokemonDb = await getPokemonsDb();
            let all = [...result, ...pokemonDb]
            res.status(200).json(all);
        } catch (err) {
            res.status(400).send(`Algo pasó que no anduvo, fijate`)
            next(err);
        }
    }
});

router.get('/:id', async (req, res, next) => {
    /* {params = :id || query = ?id=1 } */
    try {
        const { id } = req.params;
        let result;
        if (id.length > 10) {
            result = await getPokemonByIdDb(id);
            res.status(200).json(result);
        } else {
            result = await getApiPokemonById(id);
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(400).send(`No se ha encontrado ningun pokemon con ese ${id}`);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { name, attack, speed } = req.body;
        if (name && attack && speed) {
            const pokemon = await Pokemons.create({name, attack, speed});
            res.status(200).json(pokemon);
        } else {
            res.status(200).send('No se recibieron todos los parámetros')
        }
    } catch (err) {
        next(err);
    }
})

    /*              ----------     PUT AND DELETE     ----------              */

router.put('/:id', async (req, res, next) => {
    /* Parece que los datos por params (aunque sea int) llega como string */
    try {
        const { id } = req.params;
        const changes = req.body;
        if (id.length < 12) {
            return res.status(200).send(`No se puede modificar un pokemon de la API`)
        } else {
            await Pokemons.update(changes, {
                where: { id }
            })
            return res.status(200).send(`El pokemon ha sido modificado exitosamente`)
        }
    } catch (err) {
        res.status(400).send(`Fijate keloke pero no anduvo`)
        next(err);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if ( id.length < 14 ) return res.status(200).send(`No se puede eliminar un pokemon de la API`)
        await Pokemons.destroy( { where: { id } } )
        res.status(200).send(`El pokemon ha sido eliminado exitosamente`)
    } catch (err) {
        next(err)
    }
})

module.exports = router;
