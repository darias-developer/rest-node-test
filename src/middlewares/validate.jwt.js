const {request, response} = require('express');

const {getUserByUid} = require('../services/user.service');

const {validateJWT} = require('../helpers/generate.jwt.helper');

const ValidationError = require('../util/ValidationError');

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @throws 401 Unauthorized
 */
const validateToken = async ( req = request, res = response, next ) => {
  // obtiene parametros desde el headers
  const token = req.header('x-token');

  try {
    if (!token) {
      throw new ValidationError('No se ha encontrado token de sesion');
    }

    const {uid} = validateJWT(token);

    // obtiene usuario
    const userAuth = await getUserByUid(uid);

    // valida si el usuario es valido
    if (!userAuth) {
      throw new ValidationError('Usuario no existe');
    }

    // valida si el usuario es valido
    if (!userAuth.status) {
      throw new ValidationError('Usuario no valido');
    }

    req.userAuth = userAuth;

    next();
  } catch (error) {
    console.log(error);
    const errData = {responseCode: 'ERROR', description: null};
    if (error instanceof ValidationError) {
      errData.description = error.message;
    } else {
      errData.description = 'Ha ocurrido un error en la validacion de token';
    }

    res.status(401).json(errData);
  }
};

module.exports = {
  validateToken,
};
