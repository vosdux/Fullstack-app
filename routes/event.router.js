const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const Event = require('../models/Event');
const { getFunc, getItemFunc, postFunc } = require('../helpers/routerHelpers');

const router = Router();

const changeData = (req) => {
    return {
        ...req.body,
    }
}

router.get('/', auth, getFunc(Event));
router.get('/:id', auth, getItemFunc(Event));
router.post('/', auth, postFunc(Event, changeData));

module.exports = router;