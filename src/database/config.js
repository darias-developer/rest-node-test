const mongoose = require('mongoose');

const logger = require('../helpers/logger.helper')(module);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    logger.info('Base de datos en linea');
  } catch (err) {
    logger.error(err);
    throw new Error('Error en la conexion a la db');
  }
};

module.exports = {
  dbConnection,
};
