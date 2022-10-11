const { Router } = require('express');
const { Pokemons, Types } = require('../db');
const { getApiPokemons, getApiPokemonById, getApiPokemonByName } = require('../controllers/getsApi');
const { getPokemonsDb, getPokemonByIdDb, getPokemonByNameDb } = require('../controllers/getsDb');

const router = Router();


router.get('/', async (req, res, next) => {
    const { name } = req.query;
    let result;
    if (name) {
        try {
            result = await getPokemonByNameDb(name);
            if ( result === null ) result = await getApiPokemonByName(name);
            return res.status(200).json(result)
        } catch (err) {
            res.status(404).send(`The pokemon ${name} has not been found`)
            next(err);
        }
    } else {
        try {
            let all;
            result = await getApiPokemons();
            let pokemonDb = await getPokemonsDb();
            if ( pokemonDb.length > 0 ) {
                all = [...result, ...pokemonDb]
                return res.status(200).json(all);
            } else {
                all = result;
                return res.status(200).json(all);
            }
        } catch (err) {
            res.status(404).send(`Couldn't fetch any items`);
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
        res.status(404).send(`No pokemon found with that id`);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, img, id, types } = req.body;
    const short = name.toLowerCase()
    try {
        // ACÁ TENGO QUE PONER UNA CONDICIÓN DE QUE NO LO CREE SI YA EXISTE ESE NOMBRE
        let newPokemon = await Pokemons.create({name: short, hp, attack, defense, speed, height, weight, img, id, types});
        let typeDb = await Types.findAll({ where: { name: types } });
        await newPokemon.addTypes(typeDb);
        res.status(200).json(newPokemon);
        // Y QUE SI ES ASÍ ME DIGA QUE YA EXISTE UN POKEMON CON ESE NOMBRE
    } catch (err) {
        res.status(400).send('Something went wrong');
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
