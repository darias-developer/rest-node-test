const {Router} = require('express');
const {check} = require('express-validator');

const {validateFields} = require('../middlewares/validate.fields');

const {
  login,
  googleSignin} = require('../controllers/auth.controller');

const router = new Router();

router.post('/login', [
  check('email', 'El correo no es valido').isEmail(),
  check('password', 'La contrasena es obligatoria').not().isEmpty(),
  check('password', 'La contrasena debe ser de mas de 6 letras')
      .isLength({min: 6}),
  validateFields,
], login);

router.post('/google', [
  check('idToken', 'El campo id_token no es valido').not().isEmpty(),
  validateFields,
], googleSignin);


module.exports = router;
