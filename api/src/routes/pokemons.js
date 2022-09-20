const { Router } = require('express');
const { Pokemons, Types } = require('../db');
const { Op } = require ('sequelize');
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
        res.status(400).send(`No se ha encontrado ningun pokemon con ese id`);
        next(err);
    }
});


router.post('/', async (req, res) => {
    const { name, attack, defense, hp , speed, height, weight, types, img, imgId } = req.body;
    try {
        let newPokemon = await Pokemons.create({
            name,
            attack,
            defense,
            hp,
            speed,
            height,
            weight,
            img,
            imgId
        });
        let typeDb = await Types.findAll({ where: {name: types}});
        newPokemon.addTypes(typeDb);
        res.status(201).json(newPokemon);
    } catch (err) {
        console.log('Shomething malo:', err)
    }
})

// router.post('/', async (req, res, next) => {
//     try {
//         const { name, types } = req.body;
//         if (name) {
//             let typeFind = await Types.findAll({
//                 where: {
//                     name: {
//                         [Op.or]: types
//                     }
//                 }
//             })
//             const pokemon = await Pokemons.create(req.body);
//             await pokemon.addTypes(typeFind);
//             res.status(200).json(pokemon);
//         } else {
//             res.status(200).send('No se recibieron todos los parámetros')
//         }
//     } catch (err) {
//         next(err);
//     }
// })


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
