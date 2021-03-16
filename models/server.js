const express = require('express');
const cors = require('cors');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';

        //funciones al levantar el servidor (middlewares)
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares() {
        // directorio de templates publico
        this.app.use( express.static('public') );
        
        // CORS
        this.app.use( cors() );

        //lectura y parseo del body
        this .app.use( express.json() );


    }

    routes () {
        this.app.use( this.userPath, require( '../routes/user.route' ));

    }

    listten() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;