const {validationResult} = require('express-validator');

const validateFields = (req = request, res = response, next) => {
  const errors = validationResult(req);

  if ( !errors.isEmpty() ) {
    const [error] = errors.array();

    return res.status(400).json({
      responseCode: 'ERROR',
      description: error.msg,
    });
  }

  next();
};

module.exports = {
  validateFields,
};
