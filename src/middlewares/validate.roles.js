const {request, response} = require('express');

const isAdminRole = (req = request, res = response, next) => {
  try {
    if (!req.userAuth) {
      throw new Error('No existe sesion activa');
    }

    const {role, name} = req.userAuth;

    if (role !== 'ADMIN_ROLE') {
      throw new Error(`El usuario ${name} no tiene acceso a esta funcionalidad`);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      responseCode: 'ERROR',
      description: error.message,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    try {
      if (!req.userAuth) {
        throw new Error('No existe sesion activa');
      }

      const {role, name} = req.userAuth;

      if (!roles.includes(role)) {
        throw new Error(`El usuario ${name} no tiene acceso a esta funcionalidad`);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        responseCode: 'ERROR',
        description: error.message,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
