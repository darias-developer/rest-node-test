
const validateFieldsMain = require('../middlewares/validate.fields');
const validateJWTMain = require('../middlewares/validate.jwt');
const validateRolesMain = require('../middlewares/validate.roles');

module.exports = {
  ...validateFieldsMain,
  ...validateJWTMain,
  ...validateRolesMain,
};
