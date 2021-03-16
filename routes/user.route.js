const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate.fields');

const { 
    getUser, 
    putUser, 
    postUser, 
    deleteUser, 
    patchUser } = require('../controllers/user.controller');

const router = Router();

router.get('/', getUser );

router.put('/:id', putUser );

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    check('password', 'La contrasena debe ser de mas de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('role', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], postUser );

router.delete('/', deleteUser );

router.patch('/', patchUser );

module.exports = router;
