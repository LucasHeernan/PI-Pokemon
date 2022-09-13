const { Router } = require('express');
const { getApiPokemons } = require('../controllers/Utils');

const router = Router();

router.get('/pokemons', getApiPokemons);

module.exports = router