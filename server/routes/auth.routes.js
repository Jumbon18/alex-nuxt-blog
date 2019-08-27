const {Router} = require('express');
const router = Router();

const passport = require('passport');
const controller = require('../controllers/auth.controller');

router.post('/admin/login',controller.login);
router.post('/admin/create',
  passport.authenticate('jwt', {session: false}),
  controller.createUser);
module.exports = router;
