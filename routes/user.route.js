const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate.fields');
const { 
    isRoleValid, 
    isEmailExist, 
    isUserExistById } = require('../helpers/db.validator.helper');


const { 
    getUsers, 
    updateUser, 
    addUser, 
    deleteUser, 
    patchUser } = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers );

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isUserExistById ),
    check('role').custom( isRoleValid ),
    validateFields
], updateUser );

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    check('password', 'La contrasena debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( isEmailExist ),
    //check('role', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isRoleValid ),
    validateFields
], addUser );

router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( isUserExistById ),
    validateFields
], deleteUser );

router.patch('/', patchUser );

module.exports = router;
