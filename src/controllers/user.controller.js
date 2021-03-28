const {request, response} = require('express');
const bcryptjs = require('bcryptjs');

const {getUsers_} = require('../services/user.service');
const User = require('../models/user.model');

const getUsers = async (req = request, res = response) => {
  // obtiene los parametros desde la url
  const {limit = 10, offset = 0} = req.query;

  // obtiene lista paginada
  const [total, usuarios] = await getUsers_(limit, offset);

  res.json({
    responseCode: 'OK',
    description: null,
    result: {
      count: usuarios.length,
      total,
      usuarios,
    }
  });
};

const updateUser = async (req = request, res = response) => {
  // obtiene campos desdes la url del request
  const {id} = req.params;
  // obtiene campos desdes el body del request
  const {name, email, role, newPassword} = req.body;

  const data = {name};

  if (req.userAuth.email != email) {
    data.email = email;
  }

  if (req.userAuth.role == 'ADMIN_ROLE') {
    const salt = bcryptjs.genSaltSync();
    const password = bcryptjs.hashSync( newPassword, salt );
    data.role = role;
    data.role = password;
    await User.findByIdAndUpdate(id, data);
  } else {
    await User.findByIdAndUpdate(id, data);
  }

  res.json({
    responseCode: 'OK',
    description: 'usuario actualizado con exito',
  });
};

const addUser = async (req = request, res = response) => {
  const {name, email, password, role} = req.body;

  const user = new User({name, email, password, role});

  // encriptar contrase;a
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  // guardar en db
  await user.save();

  res.json({
    responseCode: 'OK',
    description: 'post api',
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const query = {status: false};

  const {id} = req.params;

  // borrado fisico
  // const user = await User.findByIdAndDelete( id );

  const user = await User.findByIdAndUpdate(id, query);
  const userAuth = req.userAuth;

  res.json({
    responseCode: 'OK',
    description: 'delete api',
    user,
    userAuth,
  });
};

const patchUser = (req = request, res = response) => {
  res.json({
    responseCode: 'OK',
    description: 'patch api',
  });
};

module.exports = {
  getUsers, updateUser, addUser, deleteUser, patchUser,
};
