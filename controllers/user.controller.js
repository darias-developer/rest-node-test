const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');


const getUsers = async(req = request, res = response) => {

    const { limit = 10, offset = 0 } = req.query;
    const query = { status: true };

    const [total, usuarios] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .limit( Number( limit ) )
            .skip( Number( offset ) )
    ]);

    res.json({
        responseCode: 'OK',
        description: '',
        count: usuarios.length,
        total,
        usuarios
    });
}

const updateUser = async(req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...data } = req.body;

    // validar contra base de datos

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, data );

    res.json({
        responseCode: 'OK',
        description: 'put api',
        user
    });
}

const addUser = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    // encriptar contrase;a
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // guardar en db
    await user.save();

    res.json({
        responseCode: 'OK',
        description: 'post api',
        user
    });
}

const deleteUser = async(req = request, res = response) => {

    const query = { status: false };

    const { id } = req.params;

    //borrado fisico
    //const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate(id, query);

    res.json({
        responseCode: 'OK',
        description: 'delete api',
        user
    });
}

const patchUser = (req = request, res = response) => {
    res.json({
        responseCode: 'OK',
        description: 'patch api'
    });
}

module.exports = {
    getUsers, updateUser, addUser, deleteUser, patchUser
}