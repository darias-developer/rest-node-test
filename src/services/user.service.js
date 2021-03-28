const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const getUsers_ = async (limit, offset) => {
  // filtra la query por campos
  const query = {status: true};
  // consulta 2 querys y devuelve el resultado cuendo las 2 querys terminen
  return [total, usuarios] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
        .select({'_id': 1, 'name': 2, 'email': 3, 'role': 4})
        .limit( Number( limit ) )
        .skip( Number( offset ) ),
  ]);
};

const getUserByEmail = async (email) => {
  return await User.findOne({email});
};

const createUser = async (userData) => {
  try {
    // encriptar contrase;a
    const salt = await bcryptjs.genSaltSync();
    userData.password = await bcryptjs.hashSync(userData.password, salt);

    const user = new User({
      name: userData.name,
      email: userData.email,
      role: userData.role,
      password: userData.password,
    });

    // guardar en db
    await user.save();
  } catch (error) {
    console.error(error);
    throw new Error('Ha ocurrido un error al crear el usuario');
  }
};

const updateUser = async (userData) => {
  try {
    const user = new User();
    user.name = userData.name;
    user.email = userData.email;

    if (userData.password) {
      // encriptar contrase;a
      const salt = await bcryptjs.genSaltSync();
      user.password = await bcryptjs.hashSync(userData.password, salt);
    }

    if (userData.role) {
      user.role = userData.role;
    }

    if (userData.status) {
      user.status = userData.status;
    }

    // guardar en db
    await user.save();
  } catch (error) {
    console.error(error);
    throw new Error('Ha ocurrido un error al crear el usuario');
  }
};

module.exports = {
  getUsers_,
  getUserByEmail,
  createUser,
  updateUser,
};
