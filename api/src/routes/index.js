const { Router } = require('express');
const pokemons = require('./routesApi');
const types = require('./routeTypes');

const router = Router();

router.use('/pokemons', pokemons);
router.use('/types', types);

module.exports = router;
