const { Router } = require('express');
const auth = require('../middleware/auth.middleware');
const Biography = require('../models/Biography');
const { getItemFunc, postFunc } = require('../helpers/routerHelpers');

const router = Router();

router.get('/:id', auth, getItemFunc(Biography));
router.post('/', auth, postFunc(Biography));

router.post('/rate/:id', auth, postFunc(Biography));