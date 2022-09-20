const { Pokemons, Types } = require('../db');
const { Op } = require ('sequelize');


// TRAE TODOS LOS POKEMONES QUE HAYA EN LA BASE DE DATOS
async function getPokemonsDb() {
    try {
        const pokemonDb = await Pokemons.findAll({
            attributes:[
                'id',
                'name',
                'hp',
                'attack',
                'defense',
                'speed',
                'height',
                'weight',
                'img',
            ],
            include: {
                model: Types,
                attributes:['name'],
                through: {
                    attribute:[]
                }
            },
            attributes:{
                exclude:['createdAt','updatedAt']
                
            }
        });
        return pokemonDb;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// BUSCA POR ID EN LA BASE DE DATOS
async function getPokemonByIdDb(id) {
    try {
        const pokemonDb = await Pokemons.findByPk(id);
        return pokemonDb;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// BUSCA POR NAME EN BASE DE DATOS
async function getPokemonByNameDb(name) {
    try {
        const pokemonDb = await Pokemons.findOne({
            /* SENSITIVE NAMES */
            where: { name: { [Op.iLike]: name } }
        });
        return pokemonDb;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    getPokemonsDb,
    getPokemonByIdDb,
    getPokemonByNameDb
}