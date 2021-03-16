const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user.model');


const getUser = (req = request, res = response) => {

    const {test, test1} = req.query;

    res.json({
        responseCode: 'OK',
        description: 'get api',
        test,
        test1
    });
}

const putUser = (req = request, res = response) => {

    const {id} = req.params;

    res.json({
        responseCode: 'OK',
        description: 'put api',
        id
    });
}

const postUser = async(req = request, res = response) => {

    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    // verificar si el correo existe
    const emailExists = await User.findOne({ email });

    if ( emailExists ) {
        return res.status(400).json({
            responseCode: 'ERROR',
            description: `El correo ${email} ya esta registrado`
        });
    }

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

const deleteUser = (req = request, res = response) => {
    res.json({
        responseCode: 'OK',
        description: 'delete api'
    });
}

const patchUser = (req = request, res = response) => {
    res.json({
        responseCode: 'OK',
        description: 'patch api'
    });
}

module.exports = {
    getUser, putUser, postUser, deleteUser, patchUser
}