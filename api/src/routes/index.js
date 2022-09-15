const { Router } = require('express');
const pokemonsRoutes = require('./routesApi');
const typesRoute = require('./routeTypes');

const router = Router();

router.use('/pokemons', pokemonsRoutes);
router.use('/types', typesRoute);

module.exports = router;
