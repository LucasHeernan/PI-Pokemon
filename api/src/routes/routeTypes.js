const { Router } = require('express');
const axios = require('axios');
const { Types } = require('../db')

const router = Router();


/* TRAER TODOS LOS TIPOS DE POKEMONS 'https://pokeapi.co/api/v2/type' */
const getApiTypes = async () => {
    try {
        let types = await Types.findAll();
        if (!types.length) {
            const api = await axios(`https://pokeapi.co/api/v2/type`).then(e => e.data.results);
            let allTypes = api.map(e => ({name: e.name}));
            types = await Types.bulkCreate(allTypes);
        } else {
            return types;
        }
    } catch (err) {
        throw err;
    }
}

router.get('/', async (req, res, next) => {
    try {
        const result = await getApiTypes();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
})

module.exports = router;