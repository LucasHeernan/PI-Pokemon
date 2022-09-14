const { Router } = require('express');
const axios = require('axios');

const router = Router();


/* TRAER TODOS LOS TIPOS DE POKEMONS 'https://pokeapi.co/api/v2/type' */
const getApiTypes = async () => {
    try {
        const api = await axios(`https://pokeapi.co/api/v2/type`).then(e => e.data.results);
        const types = api.map(e => ({name: e.name}))
        return types;
    } catch (err) {
        throw err;
    }
}

router.get('/', async (req, res, next) => {
    try {
        const result = await getApiTypes();
        res.json(result);
    } catch (err) {
        next(err);
    }
})

module.exports = router;