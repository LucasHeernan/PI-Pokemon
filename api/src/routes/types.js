const { Router } = require('express');
const { getApiTypes } = require('../controllers/getsApi');

const router = Router();


router.get('/', async (req, res, next) => {
    try {
        const result = await getApiTypes();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
})


// router.get('/', async (req, res) => {
//     try {
//         await SaveTypesDb();
//         let allTypes = await GetTypesDB();
//         res.status(200).send(allTypes)
//     } catch (err) {
//         res.status(400).send('Algo paso que no anduvo', err);
//         console.log(err);
//     }
// })


module.exports = router;