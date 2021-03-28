const {request, response} = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if ( !req.userAuth ) {
    return res.status(500).json({
      responseCode: 'ERROR',
      description: 'No existe sesion activa',
    });
  }

  const {role, name} = req.userAuth;

  if ( role !== 'ADMIN_ROLE' ) {
    return res.status(401).json({
      responseCode: 'ERROR',
      description: `El usuario ${name} no tiene acceso a esta funcionalidad`,
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if ( !req.userAuth ) {
      return res.status(500).json({
        responseCode: 'ERROR',
        description: 'No existe sesion activa',
      });
    }

    const {role, name} = req.userAuth;

    if ( !roles.includes( role ) ) {
      return res.status(401).json({
        responseCode: 'ERROR',
        description: `El usuario ${name} no tiene acceso a esta funcionalidad`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
