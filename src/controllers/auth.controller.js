const {request, response} = require('express');

const {getUserByEmail} = require('../services/user.service');

const {generateJWT} = require('../helpers/generate.jwt.helper');
const {googleVerify} = require('../helpers/google-verify');
const {isValidPassword} = require('../helpers/hash.helper');

const login = async (req = request, res = response) => {
  // obtiene parametros desde body
  const {email, password} = req.body;

  try {
    // verificar si el email existe
    const user = await getUserByEmail(email);

    if ( !user ) {
      throw new Error(`El email ${email} no se encuentra registrado`);
    }

    // verificar si el usuario exisate o esta habilitado
    if ( !user.status ) {
      throw new Error(`El usuario ${email} no se encuentra habilitado`);
    }

    // verificar password
    if ( !isValidPassword(password, user.password) ) {
      throw new Error(`la contrasena no es valida`);
    }

    // generar jwt
    const token = await generateJWT( user.id );

    res.json({
      responseCode: 'OK',
      description: null,
      result: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      responseCode: 'ERROR',
      description: error.message,
    });
  }
};

const googleSignin = async (req = request, res = response) => {
  // obtiene parametros desde body
  const {idToken} = req.body;

  try {
    // verifica el token enviado por google
    const {name, img, email} = await googleVerify(idToken);

    res.json({
      responseCode: 'OK',
      description: null,
      result: {
        name,
        img,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      responseCode: 'ERROR',
      description: 'token de google no valido',
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
