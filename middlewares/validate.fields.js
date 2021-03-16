const { validationResult } = require('express-validator');

const validateFields = (req = request, res = response, next) => {

    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {

        const { msg } = errors.array()[0];

        return res.status(400).json({
            responseCode: 'ERROR',
            description: msg,
        });
    }

    next();
}

module.exports = {
    validateFields
}