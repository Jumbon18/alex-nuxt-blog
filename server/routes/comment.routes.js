const {Router} = require('express');
const router = Router();
const ctr = require('../controllers/commnet.controller');

router.post('/',ctr.create);

module.exports = router;
