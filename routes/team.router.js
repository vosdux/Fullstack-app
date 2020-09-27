const { Router } = require('express');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.get('/', auth, (req, res) => {
    console.log(req);
});

module.exports = router;