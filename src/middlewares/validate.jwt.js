const jwt = require('jsonwebtoken');
const {request, response} = require('express');

const User = require('../models/user.model');

const validateJWT = async ( req = request, res = response, next ) => {
  const token = req.header('x-token');

  if ( !token ) {
    return res.status(401).json({
      responseCode: 'ERROR',
      description: 'No se ha encontrado token de sesion',
    });
  }

  try {
    const {uid} = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY);

    // obtiene usuario
    const userAuth = await User.findById( uid );

    // valida si el usuario es valido
    if ( !userAuth ) {
      return res.status(401).json({
        responseCode: 'ERROR',
        description: 'Usuario no existe',
      });
    }

    // valida si el usuario es valido
    if ( !userAuth.status ) {
      return res.status(401).json({
        responseCode: 'ERROR',
        description: 'Usuario no valido',
      });
    }

    req.userAuth = userAuth;

    next();
  } catch ( err ) {
    console.log(err);
    return res.status(401).json({
      responseCode: 'ERROR',
      description: 'Token no valido',
    });
  }
};

module.exports = {
  validateJWT,
};
