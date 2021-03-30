const jwt = require('jsonwebtoken');

const ValidationError = require('../util/ValidationError');

const generateJWT = (uid) => {
  if (!uid) {
    throw new ValidationError('El uid no es valido');
  }
  return new Promise( (resolve, reject) => {
    const payload = {uid};
    const prvKey = process.env.SECRET_OR_PRIVATE_KEY;
    const options = {
      expiresIn: '4h',
    };

    jwt.sign(payload, prvKey, options, (err, token) => {
      if (err) {
        console.error(err);
        reject(new ValidationError('No se pudo generar el token'));
      } else {
        resolve(token);
      }
    });
  });
};

const validateJWT = (token) => {
  if (!token) {
    throw new ValidationError('El token no es valido');
  }

  try {
    return jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);
  } catch (error) {
    console.error(error);
    throw new ValidationError('Firma no valida');
  }
};

module.exports = {
  generateJWT,
  validateJWT,
};

