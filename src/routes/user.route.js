const {Router} = require('express');
const {check} = require('express-validator');

const {
  validateFields,
  validateJWT,
  hasRole} = require('../middlewares');

const {
  isRoleValid,
  isEmailExist,
  isUserExistById} = require('../helpers/db.validator.helper');

const {validateUserUpdate} = require('../middlewares/validate.user-update');

const {
  getUsers,
  updateUser,
  addUser,
  deleteUser,
  patchUser} = require('../controllers/user.controller');

const router = new Router();

router.get('/', getUsers );

router.put('/update/:id', [
  // valida que el endpoint contenga un token valido
  validateJWT,
  // validacion de campos
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( isUserExistById ),
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El correo no es valido').isEmail(),
  /*
  valida el rol del usuario logeado en caso de ser admin realiza
  validacion de los campos estado, password y new password
  */
  validateUserUpdate,
  // valida si el payload contiene error o si es correcto
  validateFields,
],
// encaso de que el payload no contenga error pasa al controlador
updateUser);

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contrasena es obligatoria').not().isEmpty(),
  check('password', 'La contrasena debe ser de mas de 6 letras')
      .isLength({min: 6}),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom( isEmailExist ),
  // check('role', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( isRoleValid ),
  validateFields,
], addUser);

router.delete('/:id', [
  validateJWT,
  hasRole('ADMIN_ROLE', 'USER_ROLE'),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( isUserExistById ),
  validateFields,
], deleteUser );

router.patch('/', patchUser );

module.exports = router;
