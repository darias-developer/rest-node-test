const express = require('express');
const cors = require('cors');

const {dbConnection} = require('../database/config');

const {createUser,
  getUserByEmail} = require('../services/user.service');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = '/api/user';
    this.authPath = '/api/auth';

    // conectar a a base de datos
    this.connectToDb();

    // crea usuario inicial
    this.createBaseUser();

    // funciones al levantar el servidor (middlewares)
    this.middlewares();

    // rutas
    this.routes();
  }

  async connectToDb() {
    await dbConnection();
  }

  async createBaseUser() {
    const user = await getUserByEmail('test@test.cl');
    if (!user) {
      const userData = {
        name: 'Test Test',
        email: 'test@test.cl',
        role: 'ADMIN_ROLE',
        password: '123456',
      };
      await createUser(userData);
    }
  }

  middlewares() {
    // directorio de templates publico
    this.app.use( express.static('public') );

    // CORS
    this.app.use( cors() );

    // lectura y parseo del body
    this .app.use( express.json() );
  }

  routes() {
    this.app.use( this.userPath, require( '../routes/user.route' ));
    this.app.use( this.authPath, require( '../routes/auth.route' ));
  }

  listten() {
    this.app.listen( this.port, () => {
      console.log('Servidor corriendo en puerto: ', this.port);
    });
  }
}

module.exports = Server;
