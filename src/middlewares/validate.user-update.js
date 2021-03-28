const {request, response} = require('express');

const {isRoleValid,
  isPasswordValid} = require('../helpers/db.validator.helper');

const validateUserUpdate = async ( req = request, res = response, next ) => {
  const {role, password, newPassword} = req.body;

  try {
    // valido si el usurio tienen permisos para actualizar el role y contraseña
    if (req.userAuth.role == 'ADMIN_ROLE') {
      isRoleValid(role);
      isPasswordValid(password, req.userAuth.password);

      if (!newPassword || newPassword.length == 0) {
        throw new Error('La contrasena es obligatoria');
      }

      if (newPassword.length < 6) {
        throw new Error('La contrasena debe ser de mas de 6 letras');
      }
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      responseCode: 'ERROR',
      description: error.message,
    });
  }
};

module.exports = {
  validateUserUpdate,
};
