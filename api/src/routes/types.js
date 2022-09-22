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


module.exports = router;