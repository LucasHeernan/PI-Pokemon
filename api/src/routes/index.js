const { Router } = require('express');
const pokemons = require('./pokeRoutes');
const router = Router();

router.use('/pokemons', pokemons);

module.exports = router;
